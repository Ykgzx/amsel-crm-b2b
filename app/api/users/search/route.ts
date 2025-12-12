// app/api/users/search/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('q')?.trim() || '';
    const statusFilter = searchParams.get('status') || '';
    const page = Number(searchParams.get('page') || 1);
    const limit = Number(searchParams.get('limit') || 10);

    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (query) {
      // ค้นหาจาก firstName, lastName, email, phone, registerCode, lineUserId, company
      whereClause.OR = [
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { email: { contains: query } },
        { phoneNumber: { contains: query } },
        { registerCode: { contains: query } },
        { lineUserId: { contains: query } },
        { company: { contains: query } },
      ];
    }

    if (statusFilter && statusFilter !== 'All') {
      whereClause.status = statusFilter.toUpperCase(); // PENDING, ACTIVE, INACTIVE
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        lineUserId: true,
        firstName: true,
        lastName: true,
        company: true,
        phoneNumber: true,
        email: true,
        tier: true,
        registerCode: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    const total = await prisma.user.count({ where: whereClause });

    // รวม firstName + lastName เป็น fullName
    const formatted = users.map((user) => ({
      id: user.id,
      lineUserId: user.lineUserId,
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      company: user.company,
      phoneNumber: user.phoneNumber,
      email: user.email,
      tier: user.tier,
      registerCode: user.registerCode,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      status: user.status,
      roles: user.roles.map((userRole) => userRole.role),
    }));

    return NextResponse.json({
      data: formatted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('API /users/search ERROR:', error);
    return NextResponse.json(
      { error: 'ไม่สามารถค้นหาผู้ใช้ได้', details: error.message },
      { status: 500 }
    );
  }
}
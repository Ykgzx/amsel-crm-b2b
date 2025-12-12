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
      // เพิ่ม company เข้าไปใน search
      whereClause.OR = [
        { fullName: { contains: query } },
        { email: { contains: query } },
        { phoneNumber: { contains: query } },
        { registerCode: { contains: query } },
        { lineUserId: { contains: query } },
        { company: { contains: query } }, // ← เพิ่มตรงนี้
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
        fullName: true,
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

    const formatted = users.map((user) => ({
      ...user,
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
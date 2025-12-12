// app/api/users/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        companies: {
          include: {
            company: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // แปลงโครงสร้างให้ frontend ใช้งานง่าย และรวม firstName + lastName เป็น fullName
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
      roles: user.roles.map((userRole) => ({
        id: userRole.role.id,
        name: userRole.role.name,
      })),
      companies: user.companies.map((userCompany) => ({
        id: userCompany.company.id,
        companyName: userCompany.company.companyName,
      })),
    }));

    return NextResponse.json(formatted);
  } catch (error: any) {
    console.error('API /users ERROR:', error);
    return NextResponse.json(
      {
        error: 'ไม่สามารถดึงข้อมูลผู้ใช้ได้',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
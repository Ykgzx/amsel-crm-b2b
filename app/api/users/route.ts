// app/api/users/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
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
        status: true,                 // ← เพิ่ม → error 2353 หาย
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
        companies: {
          select: {
            company: {
              select: {
                id: true,
                companyName: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // แปลงโครงสร้างให้ frontend ใช้งานง่าย
    const formatted = users.map((user) => ({
      ...user,
      status: user.status, // TypeScript รู้จักแล้ว
      roles: user.roles.map((userRole) => userRole.role),     // ไม่มี implicit any
      companies: user.companies.map((userCompany) => userCompany.company), // ไม่มี implicit any
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
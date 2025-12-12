// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = parseInt(params.id, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'ID ผู้ใช้ไม่ถูกต้อง' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        lineUserId: true,
        fullName: true,           // ใช้ฟิลด์นี้แทน firstName + lastName
        company: true,
        phoneNumber: true,
        email: true,
        tier: true,
        registerCode: true,
        createdAt: true,
        updatedAt: true,
        // ถ้าต้องการดึง roles และ companies ด้วย (optional)
        // roles: { select: { role: { select: { id: true, name: true } } } },
        // companies: { select: { company: { select: { id: true, companyName: true } } } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'ไม่พบผู้ใช้' }, { status: 404 });
    }

    // ส่งข้อมูลกลับไปให้ frontend (ไม่มี firstName/lastName/credit)
    return NextResponse.json({
      ...user,
      // ถ้าต้องการสร้าง fullName เพิ่มเติมก็ทำได้ แต่ schema มีอยู่แล้ว
    });
  } catch (error: any) {
    console.error('API /users/[id] ERROR:', error);
    return NextResponse.json(
      {
        error: 'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
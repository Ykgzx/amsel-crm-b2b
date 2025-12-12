// app/api/users/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lineUserId = searchParams.get('lineUserId')?.trim();

    if (!lineUserId) {
      return NextResponse.json(
        { error: 'กรุณาระบุ lineUserId' },
        { status: 400 }
      );
    }

    // ค้นหาผู้ใช้
    const user = await prisma.user.findUnique({
      where: { lineUserId },
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
        // ถ้าต้องการเพิ่มข้อมูลอื่น เช่น roles หรือ companies
        // roles: { select: { role: { select: { name: true } } } },
      },
    });

    if (user) {
      return NextResponse.json({
        exists: true,
      });
    }

    // ไม่พบผู้ใช้ → ส่งข้อมูลที่จำเป็นสำหรับการสมัคร
    return NextResponse.json({
      exists: false,
      message: 'ไม่พบผู้ใช้ในระบบ กรุณาสมัครสมาชิก',
      lineUserId, // ส่งกลับไปให้ frontend ใช้ในหน้า register ได้เลย
    });
  } catch (error: any) {
    console.error('API /users/search ERROR:', error);

    // ใน production อย่าคืน details ให้ client
    const isDev = process.env.NODE_ENV === 'development';
    return NextResponse.json(
      {
        error: 'เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้',
        ...(isDev ? { details: error.message } : {}),
      },
      { status: 500 }
    );
  }
}
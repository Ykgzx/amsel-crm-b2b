
// app/api/users/check/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {

    // ------------------------------
    // 1) อ่าน LINE Access Token จาก Header
    // ------------------------------
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "กรุณาส่ง Authorization header: Bearer <accessToken>" },

        { status: 400 }
      );
    }


    const accessToken = authHeader.replace("Bearer ", "").trim();

    if (!accessToken) {
      return NextResponse.json(
        { error: "Access Token ไม่มีหรือรูปแบบไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    // ------------------------------
    // 2) ใช้ Access Token ดึงข้อมูลจาก LINE API
    // ------------------------------
    const profileResponse = await fetch("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!profileResponse.ok) {
      return NextResponse.json(
        { error: "Access Token ไม่ถูกต้องหรือนหมดอายุ" },
        { status: 401 }
      );
    }

    const profile = await profileResponse.json();
    const lineUserId = profile.userId; // ได้จาก LINE API

    // ------------------------------
    // 3) เช็คผู้ใช้ใน Database
    // ------------------------------

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

      },
    });

    if (user) {
      return NextResponse.json({
        exists: true,

        user,
      });
    }

    // ------------------------------
    // 4) ยังไม่เคยสมัคร → ส่งข้อมูลกลับไปให้สมัคร
    // ------------------------------
    return NextResponse.json({
      exists: false,
      message: "ไม่พบผู้ใช้ในระบบ กรุณาสมัครสมาชิก",
      lineUserId,
    },
  { status: 401 });

  } catch (error: any) {
    console.error("API /users/check ERROR:", error);

    const isDev = process.env.NODE_ENV === "development";
    return NextResponse.json(
      {
        error: "เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้",

        ...(isDev ? { details: error.message } : {}),
      },
      { status: 500 }
    );
  }

}


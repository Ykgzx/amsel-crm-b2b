// src/app/api/users/route.ts  (หรือ /route.ts ตามโครงสร้างของคุณ)

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// -------------------------------
// Validation Schema (รองรับ E.164 เท่านั้น)
// -------------------------------
const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "กรุณาระบุชื่อ")
    .trim()
    .transform((val) => val.trim()),

  lastName: z
    .string()
    .min(1, "กรุณาระบุนามสกุล")
    .trim()
    .transform((val) => val.trim()),

  company: z
    .string()
    .min(1, "กรุณาระบุบริษัท/ร้านค้า")
    .optional()
    .transform((val) => val?.trim()),

  email: z
    .string()
    .email("รูปแบบอีเมลไม่ถูกต้อง")
    .trim()
    .toLowerCase(),

  // ต้องเป็น +66 ตามด้วย 9 หลัก เริ่มต้นด้วย 6-9 (เบอร์มือถือไทย)
  phoneNumber: z
    .string()
    .regex(
      /^\+66[6-9]\d{8}$/,
      "เบอร์โทรศัพท์ไม่ถูกต้อง ต้องเป็นรูปแบบ +668xxxxxxxx"
    ),

  registerCode: z.literal("AMSEL", {
    message: "รหัสลงทะเบียนไม่ถูกต้อง",
  }),
});

// -------------------------------
// GET: ดึงข้อมูลผู้ใช้ทั้งหมด (สำหรับ admin หรือ debug)
// -------------------------------
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        lineUserId: true,
        firstName: true,
        lastName: true,
        company: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" },
      { status: 500 }
    );
  }
}

// -------------------------------
// POST: ลงทะเบียนผู้ใช้ใหม่ผ่าน LINE Login
// -------------------------------
export async function POST(req: NextRequest) {
  try {
    // 1. ดึง lineUserId ที่ middleware แนบมาให้แล้ว
    const lineUserId = req.headers.get("x-line-user-id");

    if (!lineUserId) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลผู้ใช้ LINE กรุณาเข้าสู่ระบบใหม่" },
        { status: 401 }
      );
    }

    // 2. รับและ validate body
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { firstName, lastName, company, phoneNumber, email } = parsed.data;

    // 3. ตรวจสอบว่ามีผู้ใช้ซ้ำไหม (lineUserId, email, phoneNumber)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ lineUserId }, { email }, { phoneNumber }],
      },
      select: {
        lineUserId: true,
        email: true,
        phoneNumber: true,
      },
    });

    if (existingUser) {
      if (existingUser.lineUserId === lineUserId) {
        return NextResponse.json(
          { error: "บัญชี LINE นี้ลงทะเบียนแล้ว" },
          { status: 409 }
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { error: "อีเมลนี้ถูกใช้งานแล้ว" },
          { status: 409 }
        );
      }
      if (existingUser.phoneNumber === phoneNumber) {
        return NextResponse.json(
          { error: "เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว" },
          { status: 409 }
        );
      }
    }

    // 4. สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        lineUserId,
        firstName,
        lastName,
        company: company || null,
        phoneNumber, // เก็บแบบ +66... (E.164)
        email,
        registerCode: "AMSEL",
      },
      select: {
        id: true,
        lineUserId: true,
        firstName: true,
        lastName: true,
        company: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "ลงทะเบียนสำเร็จ",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);

    // Prisma unique constraint violation
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      const messages: Record<string, string> = {
        lineUserId: "บัญชี LINE นี้ถูกใช้งานแล้ว",
        email: "อีเมลนี้ถูกใช้งานแล้ว",
        phoneNumber: "เบอร์โทรศัพท์นี้ถูกใช้งานแล้ว",
      };
      return NextResponse.json(
        { error: messages[field] || "ข้อมูลนี้มีอยู่ในระบบแล้ว" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// -------------------------------
// Validate 
// -------------------------------
const registerSchema = z.object({
  fullName: z.string().min(1, "กรุณาระบุชื่อ-นามสกุล").optional(),
  company: z.string().min(1, "กรุณาระบุบริษัท"),
  phoneNumber: z
    .string()
    .regex(/^0[6-9]\d{8}$/, "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (เช่น 0812345678)"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  registerCode: z.literal("AMSEL", { message: "รหัสลงทะเบียนไม่ถูกต้อง" }), //Mock Code ไว้ก่อน "AMSEL"
});

// -------------------------------
// GET: ดึงผู้ใช้ทั้งหมด 
// -------------------------------
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
        createdAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json(
      { error: "ไม่สามารถดึงข้อมูลผู้ใช้ได้" },
      { status: 500 }
    );
  }
}

// -------------------------------
// POST: ลงทะเบียนผู้ใช้ใหม่ (lineUserId มาจาก middleware)
// -------------------------------
export async function POST(req: NextRequest) {
  try {
    // 1. ดึง lineUserId จาก header (middleware set ให้แล้ว)
    const lineUserId = req.headers.get("x-line-user-id");
    
    if (!lineUserId) {
      return NextResponse.json(
        { error: "ไม่พบ LINE User ID" },
        { status: 401 }
      );
    }

    // 2. Validate body
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0].message;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, company, phoneNumber, email } = parsed.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { lineUserId },
          { email },
          { phoneNumber },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.lineUserId === lineUserId) {
        return NextResponse.json(
          { error: "บัญชี Line นี้ถูกใช้งานแล้ว" },
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

    // 3. สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        lineUserId,
        fullName: fullName ?? "",
        company,
        phoneNumber,
        email , 
        registerCode: "AMSEL", 
      },
      select: {
        id: true,
        lineUserId: true,
        fullName: true,
        company: true,
        phoneNumber: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    console.error("Register Error:", error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "ข้อมูลนี้มีอยู่ในระบบแล้ว" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
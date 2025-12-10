// app/api/admin/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'Email, password, firstName และ lastName จำเป็นต้องกรอก' },
        { status: 400 }
      );
    }

    // ตรวจสอบว่ามี email นี้แล้วหรือไม่
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'อีเมลนี้มีผู้ใช้งานแล้ว' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // สร้าง admin ใหม่
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: 'ADMIN', // กำหนด role เป็น ADMIN
        isActive: true,
      },
    });

    return NextResponse.json(
      {
        message: 'ลงทะเบียนสำเร็จ',
        admin: {
          id: newAdmin.id,
          email: newAdmin.email,
          firstName: newAdmin.firstName,
          lastName: newAdmin.lastName,
          role: newAdmin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'เกิดข้อผิดพลาดในการลงทะเบียน' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

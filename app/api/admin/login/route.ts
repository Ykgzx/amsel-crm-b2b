// app/api/admin/login/route.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    // 🔐 ตรวจสอบรหัสผ่านที่ hash แล้ว
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return Response.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    return Response.json({
      message: 'Login success',
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        // ❌ ไม่ส่ง password กลับ
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
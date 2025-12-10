// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  const password = await bcrypt.hash('ams4520', 12);

  await prisma.admin.upsert({
    where: { username: 'amsel-admin' },
    update: { password }, // อัปเดตรหัสผ่านถ้ามีอยู่แล้ว
    create: {
      username: 'amsel-admin',
      password,
      role: 'admin',
    },
  });

  console.log('✅ Admin upserted successfully');
  await prisma.$disconnect();
}

createAdmin();
// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createAdmin() {
  const password = await bcrypt.hash('ams4520', 12);

  await prisma.admin.upsert({
    where: { email: 'admin@amsel.com' },
    update: { password }, // อัปเดตรหัสผ่านถ้ามีอยู่แล้ว
    create: {
      email: 'admin@amsel.com',
      password,
      firstName: 'Admin',
      lastName: 'Amsel',
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Admin upserted successfully');
  await prisma.$disconnect();
}

createAdmin();
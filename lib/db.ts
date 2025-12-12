// -----------------------------------------------------
// 1. เพิ่มบรรทัดนี้ไว้บนสุด (เพื่อให้ script อ่าน .env ได้)
// -----------------------------------------------------
import 'dotenv/config' 

import { PrismaClient } from '@prisma/client'
import sql from 'mssql'

// ... (โค้ดเดิมของคุณ: ส่วน Prisma และ getLogDbPool) ...

const globalForPrisma = global as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const globalForMssql = global as unknown as { mssqlPool: sql.ConnectionPool }

export async function getLogDbPool() {
  // ... (โค้ดเดิมของคุณ) ...
  // copy logic เดิมมาใส่ตรงนี้
  if (globalForMssql.mssqlPool) return globalForMssql.mssqlPool
  const pool = new sql.ConnectionPool(process.env.LOG_DB_URL!)
  await pool.connect()
  globalForMssql.mssqlPool = pool
  return pool
}

// -----------------------------------------------------
// 2. เพิ่มส่วนนี้ไว้ล่างสุด (เพื่อสั่ง Run Test)
// -----------------------------------------------------
async function testConnection() {
  console.log('🔄 Testing Connections...')

  try {
    // Test 1: Prisma
    console.log('1️⃣ Connecting to Prisma (DB1)...')
    await prisma.$connect()
    console.log('✅ Prisma OK!')

    // Test 2: MSSQL Raw
    console.log('2️⃣ Connecting to MSSQL Raw (DB2)...')
    const pool = await getLogDbPool()
    console.log('✅ MSSQL Raw OK!')
    
    // ลอง Query ง่ายๆ
    const result = await pool.request().query('SELECT 1 as val')
    console.log('   Query Result:', result.recordset[0])

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    // ปิด connection เมื่อเสร็จ
    await prisma.$disconnect()
    if (globalForMssql.mssqlPool) await globalForMssql.mssqlPool.close()
    process.exit(0)
  }
}

// เรียกฟังก์ชัน test ถ้าไฟล์นี้ถูก run โดยตรง
if (require.main === module) {
  testConnection()
}
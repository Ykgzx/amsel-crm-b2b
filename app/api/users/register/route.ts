// app/api/users/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCustomerByPhone } from "@/lib/emcust";



// GET: ดึงผู้ใช้ทั้งหมด
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// POST: สร้างผู้ใช้ใหม่
// app/api/users/register/route.ts
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.otp || data.otp !== "123456") {
      return NextResponse.json(
        { error: "OTP ไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    // ดึงข้อมูลจาก EMCust table ผ่าน phoneNumber (บังคับต้องมี)
    let shopName = null;
    let custId = null;
    let customerData = null;
    
    if (!data.phoneNumber) {
      return NextResponse.json(
        { error: "กรุณาระบุเบอร์โทรศัพท์" },
        { status: 400 }
      );
    }

    try {
      customerData = await getCustomerByPhone(data.phoneNumber);
      if (customerData) {
        // ใช้ข้อมูลจาก EMCust เท่านั้น
        shopName = customerData.CustName;
        custId = customerData.CustID;
        
        console.log('Found customer in EMCust:', {
          CustID: customerData.CustID,
          CustName: customerData.CustName,
          CustCode: customerData.CustCode,
          ContTel: customerData.ContTel
        });
      } else {
        return NextResponse.json(
          { error: "ไม่พบข้อมูลลูกค้าในระบบ กรุณาติดต่อเจ้าหน้าที่" },
          { status: 404 }
        );
      }
    } catch (dbError) {
      console.error('Error fetching customer data from EMCust:', dbError);
      return NextResponse.json(
        { error: "เกิดข้อผิดพลาดในการตรวจสอบข้อมูลลูกค้า" },
        { status: 500 }
      );
    }

    // ถ้า OTP ผ่านและพบข้อมูลลูกค้า → สร้างผู้ใช้เลย
    const user = await prisma.user.create({
      data: {
        lineUserId: data.lineUserId,
        firstName: data.firstName,
        lastName: data.lastName,
        shopName: shopName, // ดึงจาก EMCust เท่านั้น
        phoneNumber: data.phoneNumber,
        email: data.email || customerData.ContEMail, // ใช้อีเมลจาก EMCust ถ้าไม่มีใน request
        role: data.role ?? "USER",
        points: data.points ?? 0,
        tier: data.tier ?? "BRONZE",
        credit: data.credit ?? 0,
        totalCreditLimit: data.totalCreditLimit,
        usedCredit: data.usedCredit,
        totalSpending: data.totalSpending,
        nextTier: data.nextTier,
        toNextTier: data.toNextTier,
        CustId: custId, // ดึงจาก EMCust เท่านั้น
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลงทะเบียน" },
      { status: 500 }
    );
  }
}

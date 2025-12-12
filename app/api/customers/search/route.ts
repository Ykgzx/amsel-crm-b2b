// app/api/customers/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCustomerByPhone, searchCustomers } from "@/lib/emcust";

// GET: ค้นหาลูกค้าจาก EMCust table
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    const search = searchParams.get('search');

    if (phone) {
      // ค้นหาด้วยเบอร์โทรศัพท์
      const customer = await getCustomerByPhone(phone);
      if (customer) {
        return NextResponse.json({ success: true, "CustName": customer.CustName });
      } else {
        return NextResponse.json({ 
          success: false, 
          message: "ไม่พบข้อมูลลูกค้าสำหรับเบอร์โทรศัพท์นี้" 
        }, { status: 404 });
      }
    } else if (search) {
      // ค้นหาด้วยคำค้นหาทั่วไป
      const customers = await searchCustomers(search);
      return NextResponse.json({ 
        success: true, 
        data: customers,
        count: customers.length 
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "กรุณาระบุ phone หรือ search parameter" 
      }, { status: 400 });
    }

  } catch (error: any) {
    console.error('Error searching customers:', error);
    return NextResponse.json({ 
      success: false, 
      error: "เกิดข้อผิดพลาดในการค้นหาข้อมูลลูกค้า",
      details: error.message 
    }, { status: 500 });
  }
}
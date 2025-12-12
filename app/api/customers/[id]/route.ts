// app/api/customers/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getCustomerById } from "@/lib/emcust";

// GET: ดึงข้อมูลลูกค้าจาก EMCust table ตาม ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const custId = parseInt(id);
    
    if (isNaN(custId)) {
      return NextResponse.json({ 
        success: false, 
        message: "Customer ID ต้องเป็นตัวเลข" 
      }, { status: 400 });
    }

    const customer = await getCustomerById(custId);
    
    if (customer) {
      return NextResponse.json({ success: true, data: customer });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: "ไม่พบข้อมูลลูกค้า" 
      }, { status: 404 });
    }

  } catch (error: any) {
    console.error('Error fetching customer:', error);
    return NextResponse.json({ 
      success: false, 
      error: "เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า",
      details: error.message 
    }, { status: 500 });
  }
}
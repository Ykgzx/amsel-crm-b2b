// app/api/admin/logout/route.ts
export async function POST() {
  // สำหรับระบบที่ใช้ localStorage → logout ทำที่ client
  // API นี้เตรียมไว้ล่วงหน้า
  return Response.json({ message: "Logout successful" }, { status: 200 });
}
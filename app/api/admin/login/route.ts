import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin || admin.password !== password) {
    return Response.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  return Response.json({
    message: "Login success",
    admin: {
      id: admin.id,
      username: admin.username,
      role: admin.role,
    },
  });
}

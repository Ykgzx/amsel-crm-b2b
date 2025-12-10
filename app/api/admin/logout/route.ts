// app/api/admin/logout/route.ts
// This endpoint is deprecated. Use NextAuth signOut() instead.
// Import in client components: import { signOut } from 'next-auth/react';
// Then call: await signOut({ callbackUrl: '/' });

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  return NextResponse.json(
    {
      message:
        'This endpoint is deprecated. Use NextAuth signOut() instead.',
      redirect: '/login',
    },
    { status: 410 } // 410 Gone
  );
}

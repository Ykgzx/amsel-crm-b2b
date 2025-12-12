// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// DEV MODE: ปิด authentication check ระหว่างพัฒนา (เช็คจาก .env)
const DEV_MODE = process.env.DEV_MODE === 'true';

// Routes ที่ต้อง verify LINE Access Token
const LINE_AUTH_ROUTES = ['/api/users/register', '/api/users/check'];

export async function middleware(request: NextRequest) {
  // CORS headers สำหรับ API routes (เปิดเสมอ)
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }

    // ตรวจสอบว่าเป็น route ที่ต้อง verify LINE Token หรือไม่
    const needsLineAuth = LINE_AUTH_ROUTES.some(route => 
      request.nextUrl.pathname.startsWith(route)
    );

    if (needsLineAuth && request.method !== 'GET') {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader) {
        return NextResponse.json(
          { error: 'กรุณาส่ง Authorization header: Bearer <accessToken>' },
          { status: 401 }
        );
      }

      const accessToken = authHeader.replace('Bearer ', '').trim();
      
      if (!accessToken) {
        return NextResponse.json(
          { error: 'Access Token ไม่ถูกต้อง' },
          { status: 401 }
        );
      }

      // ดึง LINE User ID จาก Access Token
      try {
        const profileResponse = await fetch('https://api.line.me/v2/profile', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!profileResponse.ok) {
          return NextResponse.json(
            { error: 'Access Token ไม่ถูกต้องหรือหมดอายุ' },
            { status: 401 }
          );
        }

        const profile = await profileResponse.json();
        
        // ส่ง lineUserId ผ่าน header ไปให้ route handler
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('x-line-user-id', profile.userId);

        return NextResponse.next({
          request: { headers: requestHeaders },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        });
      } catch (error) {
        return NextResponse.json(
          { error: 'ไม่สามารถตรวจสอบ Access Token ได้' },
          { status: 500 }
        );
      }
    }

    // Routes อื่นๆ ไม่ต้อง verify
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/orders/:path*', '/products/:path*'],
};
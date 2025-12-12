// app/hooks/use-auth.ts
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return {
    user: (session?.user as AuthUser) || null,
    loading: status === 'loading',
    authenticated: status === 'authenticated',
    logout,
  };
}
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {

        // ❗ validate ภาษาไทย
        if (!credentials?.email || !credentials?.password) {
          throw new Error('กรุณากรอกอีเมลและรหัสผ่าน');
        }

        try {
          const admin = await prisma.admin.findUnique({
            where: { email: credentials.email },
          });

          // ❗ ไม่เจออีเมล
          if (!admin) {
            throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
          }

          // ❗ บัญชีโดนปิดใช้งาน
          if (!admin.isActive) {
            throw new Error('บัญชีนี้ถูกระงับการใช้งาน');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.password
          );

          // ❗ รหัสผ่านผิด
          if (!isPasswordValid) {
            throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
          }

          return {
            id: admin.id.toString(),
            email: admin.email || '',
            name: `${admin.firstName} ${admin.lastName}`,
            image: null,
            role: admin.role,
          };

        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = (token.role as string) || 'USER';
      }
      return session;
    },
  },
  pages: {
    signIn: '/',
    error: '/', // ส่ง error message ผ่าน query ?error=
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

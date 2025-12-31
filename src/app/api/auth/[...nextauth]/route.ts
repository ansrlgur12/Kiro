import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('이메일과 비밀번호를 입력해주세요.');
        }

        // 사용자 조회
        const user = await prisma.user.findUnique({
          where: { user_email: credentials.email },
        });

        if (!user) {
          throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // 사용자 상태 확인
        if (user.user_status === 'DELETED') {
          throw new Error('탈퇴한 계정입니다.');
        }

        if (user.user_status === 'SUSPENDED') {
          throw new Error('정지된 계정입니다. 관리자에게 문의하세요.');
        }

        if (user.user_status === 'INACTIVE') {
          throw new Error('비활성화된 계정입니다. 계정을 재활성화해주세요.');
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.user_password_hash
        );

        if (!isPasswordValid) {
          throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
        }

        // 인증 성공
        return {
          id: user.user_id,
          email: user.user_email,
          name: user.user_name,
          image: user.user_avatar_url,
        };
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    }
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7일
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
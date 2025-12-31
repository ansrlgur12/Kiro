import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// 서버 컴포넌트에서 세션 가져오기
export async function getSession() {
  return await getServerSession(authOptions);
}

// 인증된 사용자 정보 가져오기
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// 인증 체크 (없으면 에러)
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}
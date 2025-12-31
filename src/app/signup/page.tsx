'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 비밀번호 확인 검증
    if (formData.user_password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: formData.user_name,
          user_email: formData.user_email,
          user_password: formData.user_password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || '회원가입 중 오류가 발생했습니다.');
        return;
      }

      // 회원가입 성공 시 로그인 페이지로 이동
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      router.push('/login');
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-2xl space-y-8 p-10 sm:p-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div>
          <h2 className="text-center text-4xl font-bold text-gray-900 dark:text-white">
            Kiro
          </h2>
          <p className="mt-3 text-center text-base text-gray-600 dark:text-gray-400">
            새 계정 만들기
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                이름
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="홍길동"
                value={formData.user_name}
                onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@email.com"
                value={formData.user_email}
                onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="최소 6자 이상"
                value={formData.user_password}
                onChange={(e) => setFormData({ ...formData, user_password: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                비밀번호 확인
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="비밀번호 재입력"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </button>

          <div className="text-center text-sm">
            <span className="text-gray-600 dark:text-gray-400">이미 계정이 있으신가요? </span>
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium">
              로그인
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
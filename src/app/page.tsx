import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    // 이미 로그인한 경우 워크스페이스로 리다이렉트
    if (session) {
        redirect('/workspace');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* 헤더 */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-900">
                        Kiro
                    </div>
                    <div className="space-x-4">
                        <Link
                            href="/login"
                            className="text-gray-700 hover:text-gray-900 font-medium"
                        >
                            로그인
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                        >
                            시작하기
                        </Link>
                    </div>
                </nav>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        실시간 협업 문서 편집
                    </h1>
                    <p className="text-xl text-gray-600 mb-12">
                        Kiro와 함께 팀과 실시간으로 협업하며 생산성을 높이세요.
                        <br />
                        노션처럼 강력하고, 더 빠르게.
                    </p>

                    <div className="flex justify-center gap-4 mb-20">
                        <Link
                            href="/signup"
                            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                        >
                            무료로 시작하기
                        </Link>
                        <Link
                            href="/login"
                            className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 border-2 border-gray-200 transition"
                        >
                            로그인
                        </Link>
                    </div>

                    {/* 주요 기능 */}
                    <div className="grid md:grid-cols-3 gap-8 mt-20">
                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-bold mb-3">실시간 협업</h3>
                            <p className="text-gray-600">
                                여러 사용자가 동시에 편집하며 실시간으로 변경 사항을 확인하세요.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="text-4xl mb-4">📝</div>
                            <h3 className="text-xl font-bold mb-3">블록 기반 에디터</h3>
                            <p className="text-gray-600">
                                텍스트, 코드, 이미지 등 다양한 블록으로 문서를 자유롭게 구성하세요.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-md">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-bold mb-3">권한 관리</h3>
                            <p className="text-gray-600">
                                페이지별로 세밀한 권한 설정으로 안전하게 공유하세요.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* 푸터 */}
            <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
                <div className="text-center text-gray-600">
                    <p>© 2025 Kiro. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
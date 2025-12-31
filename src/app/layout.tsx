import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
    title: "Kiro - 협업 문서 편집 도구",
    description: "실시간 협업이 가능한 노션 스타일 문서 편집기",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
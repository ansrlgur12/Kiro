import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { CreateUserDto } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body: CreateUserDto = await req.json();
    const { user_email, user_password, user_name } = body;

    // 유효성 검사
    if (!user_email || !user_password || !user_name) {
      return NextResponse.json(
        { success: false, error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user_email)) {
      return NextResponse.json(
        { success: false, error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 길이 검증
    if (user_password.length < 6) {
      return NextResponse.json(
        { success: false, error: '비밀번호는 최소 6자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 이메일 중복 체크
    const existingUser = await prisma.user.findUnique({
      where: { user_email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const user_password_hash = await bcrypt.hash(user_password, 10);

    // 사용자 생성
    const user = await prisma.user.create({
      data: {
        user_email,
        user_password_hash,
        user_name,
        user_status: 'ACTIVE',
      },
      select: {
        user_id: true,
        user_email: true,
        user_name: true,
        user_status: true,
        reg_datetime: true,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        data: user,
        message: '회원가입이 완료되었습니다. 로그인해주세요.' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
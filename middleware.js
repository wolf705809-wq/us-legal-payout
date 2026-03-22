import { NextResponse } from 'next/server';

export function middleware(req) {
  // 1. 접속자의 국가 정보 가져오기 (Vercel에서 제공)
  const country = req.geo?.country || 'US';

  // 2. 국가가 미국(US)이 아닌 경우 차단
  if (country !== 'US') {
    return new NextResponse(
      JSON.stringify({ message: 'This service is only available in the US.' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    );
  }

  // 3. 미국인 경우 정상적으로 페이지 진행
  return NextResponse.next();
}

// 4. 적용할 경로 설정 (모든 페이지와 폴더에 적용)
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

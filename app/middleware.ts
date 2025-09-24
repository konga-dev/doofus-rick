import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	if (pathname.startsWith('/auth') || pathname.startsWith('/api/auth')) {
		return NextResponse.next()
	}

	const cookie = getSessionCookie(request)
	if (!cookie) {
		return NextResponse.redirect(new URL('/auth/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

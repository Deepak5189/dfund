import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const privateRoutes=["/create-campaign", "profile", "my-campaigns", "donate"];

export function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl;
    console.log("middleware running for:", {pathname})
    const isAuthenticated = false // will update it's logic later to check if user is authenticated or not

    const isPrivate = privateRoutes.some(route=>pathname.startsWith(route));

    if(!isAuthenticated && isPrivate){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
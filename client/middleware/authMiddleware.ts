import {isTokenValid} from "../utils/auth/isTokenValid";
import {NextRequest, NextResponse} from "next/server";

export function authMiddleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const notProtectedPaths = ['/signIn', '/signOut'];
    const requiresAuth = !notProtectedPaths.some((path) => pathname.startsWith(path));

    if (requiresAuth) {
        const cookie = request.cookies.get("Authorization");
        if (!cookie || !isTokenValid(cookie.value)) {
            return NextResponse.redirect(new URL('/signIn', request.url));
        }
    }
    return NextResponse.next();
}

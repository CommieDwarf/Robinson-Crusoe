import {isTokenValid} from "../utils/auth/isTokenValid";
import {NextRequest, NextResponse} from "next/server";

export function authMiddleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const notProtectedPaths = ['/signIn', '/signOut', "/signUp"];
    const requiresAuth = !notProtectedPaths.some((path) => pathname.startsWith(path));

    if (requiresAuth) {
        const cookie = request.cookies.get("Authorization");
        console.log("cookie - ", cookie);
        console.log("valid -", cookie && isTokenValid(cookie.value));
        if (!cookie || !isTokenValid(cookie.value)) {
            console.log("token isn't valid. redirecting");
            return NextResponse.redirect(new URL('/signIn', request.url));
        }
    }
    return NextResponse.next();
}

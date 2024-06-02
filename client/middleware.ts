import {NextRequest, NextResponse} from "next/server";
import {authMiddleware} from "./middleware/authMiddleware";

export async function middleware(request: NextRequest) {
    const authResponse = authMiddleware(request);
    if (!authResponse.ok) {
        console.log("auth not ok")
        return authResponse;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/multiplayer/:path*", "/play/:path*"],
};

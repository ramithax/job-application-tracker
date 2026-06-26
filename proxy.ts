import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/auth/auth";

export async function proxy(request: NextRequest) {
    const session = await getSession();
    const pathname = request.nextUrl.pathname;

    const isAuthPage =
        pathname.startsWith("/sign-in") ||
        pathname.startsWith("/sign-up");

    const isProtectedRoute =
        pathname.startsWith("/dashboard");

    if (isAuthPage && session?.user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isProtectedRoute && !session?.user) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
};
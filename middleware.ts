import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { NextResponse } from 'next/server';

import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
    adminRoutes
} from "@/routes";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  // Handle API auth routes
  if (isApiAuthRoute) {
    return NextResponse.next(); // Continue without interfering
  }

  // Handle authentication routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return NextResponse.next(); // Continue processing if not logged in
  }

  // Handle non-public routes for non-authenticated users
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // Handle admin routes
  if (isLoggedIn && isAdminRoute) {
    const { currentUser } = await import("@/lib/auth");
    const user = await currentUser();

    if (user?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/access-denied", nextUrl));
    }
    return NextResponse.next(); // Allow access to admin routes if user is an admin
  }

  return NextResponse.next(); // Continue processing for other cases
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

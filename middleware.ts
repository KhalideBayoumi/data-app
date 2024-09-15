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

  if(isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if(isLoggedIn){
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if(!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if(nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      new URL(
        //"/auth/login", 
        `/auth/login?callbackUrl=${encodedCallbackUrl}`,
        nextUrl
      )
    );
  }

  if (isLoggedIn && isAdminRoute) {
    const { currentUser } = await import("@/lib/auth");
    
    const user = await currentUser();

    if (user?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL("/access-denied", nextUrl));
    }

    return null;
  }

  return null;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
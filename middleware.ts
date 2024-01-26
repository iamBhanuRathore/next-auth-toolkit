import NextAuth from "next-auth";
import authConfig from "./auth.config";
const { auth } = NextAuth(authConfig);
import {
  DEFAULT_AFTER_LOGIN_REDIRECT,
  ROUTE_LOGIN_PAGE,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // console.log(1);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // api for authentication - which only not logged in user can access
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // public routes - everone can access
  const isAuthRoute = authRoutes.includes(nextUrl.pathname); // authenticating routes - logged in user cannot access them
  if (isApiAuthRoute) {
    // console.log(2);
    return null;
  }
  if (isAuthRoute) {
    // console.log(3);
    if (isLoggedIn) {
      // console.log(4);
      return Response.redirect(new URL(DEFAULT_AFTER_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoute) {
    // console.log(5);
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`${ROUTE_LOGIN_PAGE}?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

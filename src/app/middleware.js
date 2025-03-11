import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl;
  const token = localStorage.getItem("accessToken");

  // Routes to protect before login
  const publicRoutes = [
    "/language",
    "/auth/enter-mobile",
    "/auth/verify-otp",
    "/auth/personal-details",
  ];

  // If user is logged in, redirect them to "/under-review"
  if (token && publicRoutes.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/under-review", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/language",
    "/auth/enter-mobile",
    "/auth/verify-otp",
    "/auth/personal-details",
  ],
};

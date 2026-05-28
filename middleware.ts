import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogged = request.cookies.get("zapflow_auth");

  const protectedRoutes = [
    "/dashboard",
    "/crm",
    "/agenda",
    "/pipeline",
    "/automacoes",
    "/conversas",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute && !isLogged) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/crm/:path*",
    "/agenda/:path*",
    "/pipeline/:path*",
    "/automacoes/:path*",
    "/conversas/:path*",
  ],
};
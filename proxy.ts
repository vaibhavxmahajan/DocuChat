import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import RoutePaths, { ProtectedRoutes, PublicRoutes } from "@/constants/route-paths";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { pathname } = request.nextUrl;

  if (session && PublicRoutes.includes(pathname as typeof PublicRoutes[number])) {
    return NextResponse.redirect(new URL(RoutePaths.HOME, request.url));
  }

  if (!session && ProtectedRoutes.includes(pathname as typeof ProtectedRoutes[number])) {
    return NextResponse.redirect(new URL(RoutePaths.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const matcher = {
  matcher: ["/", RoutePaths.LOGIN, RoutePaths.SIGNUP],
};

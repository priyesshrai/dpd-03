import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const dataCookie = request.cookies.get("data")?.value || "";

  let userData = null;
  if (dataCookie) {
    try {
      userData = JSON.parse(dataCookie);
    } catch (error) {
      userData = null;
    }
  }

  const isPublicPath = request.nextUrl.pathname === "/login";
  const isAdminDashboard = request.nextUrl.pathname.startsWith("/admin/:path*");

  if (isPublicPath && userData && userData.login_type === "superadmin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (isAdminDashboard) {
    if (!userData || userData.login_type !== "superadmin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};

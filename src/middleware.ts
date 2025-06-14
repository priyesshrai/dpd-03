import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const dataCookie = request.cookies.get("data")?.value || "";
  let userData = null;

  if (dataCookie) {
    try {
      userData = JSON.parse(dataCookie);
    } catch (error) {
      console.error("Failed to parse cookie:", error);
      userData = null;
    }
  }

  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === "/login";
  const isAdminPath = pathname.startsWith("/admin");
  const isUserPath = pathname.startsWith("/user");
  const homePage = pathname === '/'

  if (homePage && userData) {
    if (userData.login_type === "superadmin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (userData.login_type === "candidate") {
      return NextResponse.redirect(new URL("/user/" + userData.profile_slug, request.url));
    }
  }

  if (homePage && !userData) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicPath && userData) {
    if (userData.login_type === "superadmin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (userData.login_type === "candidate") {
      return NextResponse.redirect(new URL("/user/" + userData.profile_slug, request.url));
    }
  }

  if (!userData && (isAdminPath || isUserPath)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdminPath && userData?.login_type !== "superadmin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isUserPath && userData?.login_type !== "candidate") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/login", "/user/:path*"],
};

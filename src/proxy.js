import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

const ADMIN_EMAIL = "mdmosabbirrahman07@gmail.com";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const userRole = user?.role;
  const userEmail = user?.email?.toLowerCase();

  const { pathname } = request.nextUrl;

  // Not Logged In
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin
  if (pathname.startsWith("/dashboard/admin")) {
    const isAdmin =
      userRole === "admin" ||
      userEmail === ADMIN_EMAIL.toLowerCase();

    if (!isAdmin) {
      return NextResponse.redirect(
        new URL("/dashboard/customer", request.url)
      );
    }
  }

 

  // Customer
  if (
    pathname.startsWith("/dashboard/customer") &&
    userRole !== "customer"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/admin/:path*",
    

  ],
};
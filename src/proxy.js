import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from './app/lib/auth';
// import { auth } from './app/lib/auth';

const ADMIN_EMAIL = "mdmosabbirrahman07@gmail.com";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const userRole = user?.role;
  const userEmail = user?.email?.toLowerCase();
  const { pathname } = request.nextUrl;

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/dashboard/admin")) {
    const isAdmin = userEmail === ADMIN_EMAIL.toLowerCase() || userRole === "admin";
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }
  }



  // 4. Owner Route Protection
  if (pathname.startsWith("/dashboard/owner") && userRole !== "owner") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// ⭐ Matcher Update: এতে ড্যাশবোর্ডের সব সাব-রাউটসহ Customer রাউটও প্রটেক্টেড থাকবে
export const config = {
  matcher: [
    "/dashboard/admin",
    "/dashboard/customer",
  ],
};
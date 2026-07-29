export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const userRole = user?.role?.toLowerCase();   // important
  const userEmail = user?.email?.toLowerCase();

  const { pathname } = request.nextUrl;

  // Not Logged In
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Admin routes
  if (pathname.startsWith("/dashboard/admin")) {
    const isAdmin =
      userRole === "admin" ||
      userEmail === ADMIN_EMAIL.toLowerCase();

    if (!isAdmin) {
      // Admin na hole customer dashboard e pathao (login e na)
      return NextResponse.redirect(
        new URL("/dashboard/customer", request.url)
      );
    }
  }

  // Customer routes
  if (pathname.startsWith("/dashboard/customer")) {
    // Admin o customer dashboard access korte parbe (optional)
    const isAllowed =
      userRole === "customer" ||
      userRole === "admin" ||
      userEmail === ADMIN_EMAIL.toLowerCase();

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
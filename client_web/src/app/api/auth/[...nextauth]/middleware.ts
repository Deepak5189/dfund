import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Token exists — let the request through
    return NextResponse.next();
    // return false;
  },
  {
    callbacks: {
      // Return true = allow, false = redirect to signIn page (defined in authOptions)
      authorized: ({ token }) => !!token,
    },
  }
);

// Apply middleware only to these routes
export const config = {
  matcher: [
    "/create-campaign/:path*",
    "/dashboard/:path*",      // add future protected routes here
    "/settings/:path*",
  ],
};
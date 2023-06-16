import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}


export default withAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/logout"
  },
});

export const config = { 
  matcher: ["/admin/:path*", "/dashboard/:path*", "/client/:path*"]
};
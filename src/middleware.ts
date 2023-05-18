import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {


  return NextResponse.next();
}


export default withAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout"
  },
});

export const config = { 
  matcher: ["/admin/:path*", "/dashboard/:path*", "/client/:path*"]
};
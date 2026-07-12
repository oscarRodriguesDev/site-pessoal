import { NextRequest, NextResponse } from "next/server";
import { verifyTokenEdge } from "@/lib/auth-edge";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admins/dashboard")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admins/login", req.url));
    }

    const payload = await verifyTokenEdge(token);

    if (!payload) {
      const res = NextResponse.redirect(new URL("/admins/login", req.url));
      res.cookies.delete("admin_token");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admins/dashboard/:path*", "/admins/dashboard"],
};

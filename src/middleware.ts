import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware simplificado: verifica apenas a presença do cookie.
 * A validação real do JWT é feita nas API routes (Node.js runtime).
 * O cookie é httpOnly, então não pode ser forjado via JS.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admins/dashboard")) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admins/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admins/dashboard/:path*", "/admins/dashboard"],
};

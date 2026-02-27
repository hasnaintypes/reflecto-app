import NextAuth from "next-auth";
import { authConfigEdge } from "@/server/auth/auth.config.edge";

export const { auth: middleware } = NextAuth(authConfigEdge);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

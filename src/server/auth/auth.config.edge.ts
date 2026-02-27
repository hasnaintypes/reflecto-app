import { type NextAuthConfig } from "next-auth";

/**
 * Edge-compatible auth config — no Node.js-only imports (no Prisma, no bcrypt).
 * Used by middleware.ts which runs in the Edge Runtime.
 */
export const authConfigEdge = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = [
        "/write",
        "/journal",
        "/reflect",
        "/insights",
        "/dreams",
        "/highlights",
        "/ideas",
        "/notes",
        "/people",
        "/tags",
        "/wisdom",
      ];
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );
      const isAuthPage = nextUrl.pathname.startsWith("/auth");

      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }

      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/write", nextUrl));
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.image = user.image;
      }

      if (trigger === "update" && session && typeof session === "object") {
        const s = session as Record<string, unknown>;
        if (s.name) token.name = s.name as string;
        if (s.email) token.email = s.email as string;
        if (s.image) {
          token.picture = s.image as string;
          token.image = s.image as string;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id;
        if (token.name) session.user.name = token.name;
        if (token.email) session.user.email = token.email;
        session.user.image = (token.image ?? token.picture) as string | null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

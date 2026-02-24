import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { db } from "@/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    image?: string | null;
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  providers: [
    DiscordProvider,
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            image: true,
            hashedPassword: true,
          },
        });

        if (!user?.hashedPassword) return null;

        const isValid = await compare(
          credentials.password as string,
          user.hashedPassword,
        );
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(db),
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

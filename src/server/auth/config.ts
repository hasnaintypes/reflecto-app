import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig, type DefaultSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

import { db } from "@/server/db";
import { authConfigEdge } from "./auth.config.edge";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    image?: string | null;
  }
}

export const authConfig = {
  ...authConfigEdge,
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
} satisfies NextAuthConfig;

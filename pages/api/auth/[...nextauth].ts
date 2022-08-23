import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../db/prisma";
import { login, getUserByEmail } from "../../../db/users";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },

  callbacks: {
    async session({ session }) {
      if (session.user.email) {
        const response = await getUserByEmail(session.user.email, { prisma });
        const foundUser = response.user;

        if (foundUser) {
          session.user = foundUser;
        }
      }
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const response = await login(
          { email: credentials!.email, password: credentials!.password },
          { prisma }
        );

        if (response.error !== null) {
          return null;
        }

        return {
          email: response.user.email,
          name: response.user.username,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);

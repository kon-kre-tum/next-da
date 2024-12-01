import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { prisma } from "./app/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // async jwt({ token }) {
    //   console.log(token);
    //   return token;
    // },
    async session({ token, session }) {
      console.log({ session });
      console.log({ token });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

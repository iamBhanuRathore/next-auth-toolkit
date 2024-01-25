import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }: any) {
      // await session.
      if (session?.user) {
        session.user.customField = token.customField;
        session.user.userId = token.sub;
        console.log(session);
      }
      return session;
    },
    async jwt({ token }) {
      // console.log("JWT", token);
      // if (session?.user?.userId) {
      // if (session.user) {
      //   session.user.userId = token.sub;
      // }
      // }
      token.customField = "hello";
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

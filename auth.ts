import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";
import { ROUTE_ERROR_PAGE, ROUTE_LOGIN_PAGE } from "./routes";
import { getTwoFactorConfirmationByUserId } from "./lib/two-factor-confirmation";
// import { JWT } from "next-auth/jwt";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: ROUTE_LOGIN_PAGE,
    error: ROUTE_ERROR_PAGE,
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {

      // Allow OAuth (google,github) without email verfication
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);
      // Prevent sign-in without email-verification
      if (!existingUser?.emailVerified) return false;
      // checking if the use enabled two factor authentication
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
        if (!twoFactorConfirmation) return false;
        // Delete the two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id
          }
        });
      }
      return true;
    },
    async session({ session, token }: any) {
      // let a: DefaultSession;
      // console.log(token);
      if (session?.user && token.sub) {
        session.user.id = token.sub;
      }
      if (session?.user && token.role) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});

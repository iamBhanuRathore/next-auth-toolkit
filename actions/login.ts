"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import bcryptjs from "bcryptjs";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { sendMail } from "@/lib/sendmail";
import { generateVerificationToken } from "@/lib/tokens";
import { getTwoFactorConfirmationByUserId } from "@/lib/two-factor-confirmation";
import { DEFAULT_AFTER_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  console.log("Login: Action");
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  // CHECK --- if user exist and user has not logged in with other providers than credentials
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  // check password of the user
  if (existingUser.password) {
    const passwordsMatch = await bcryptjs.compare(
      password,
      existingUser.password
    );
    if (!passwordsMatch) return { error: "Invalid Credentials" };
  }

  // if user exist but the email is not verified
  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
      "VERIFICATION",
      existingUser.id
    );
    // props for sending mail --
    await sendMail({
      token: verificationToken.token,
      username: existingUser.name as string,
      userMail: existingUser.email,
      emailType: "verification",
    })
      .then((res) => console.log("MAIL SUCCESS", res))
      .catch(() => {
        return { error: "Error While sending the Mail.." };
      });
    return { success: "Confirmation Email Sent" };
  }
  // if user's two factor authentication is enabled
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getVerificationTokenByEmail(
        existingUser.email,
        "TWOFACTOR"
      );
      if (!twoFactorToken) {
        return { codeError: "Invalid OTP!" };
      }
      if (twoFactorToken.token !== code) {
        return { codeError: "Invalid OTP!" };
      }
      const hasExpired = new Date(twoFactorToken.expire) < new Date();
      if (hasExpired) {
        return { codeError: "OTP Expired!" };
      }
      await db.verificationToken.delete({
        where: { id: twoFactorToken.id },
      });
      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { userId: existingUser.id },
        });
      }
      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      const twoFactorConfirmation = await generateVerificationToken(
        existingUser.email,
        "TWOFACTOR",
        existingUser.id
      );
      await sendMail({
        emailType: "two-factor",
        token: twoFactorConfirmation.token,
        userMail: existingUser.email,
        username: existingUser.name || "User",
      });
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_AFTER_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "AuthorizedCallbackError":
          return { error: "Google Auth Error" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  return { success: "Success" };
};

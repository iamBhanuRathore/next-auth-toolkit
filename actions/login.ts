"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendMail } from "@/lib/sendmail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_AFTER_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
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
  // if user exist but the email is not verified
  if (!existingUser?.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
      'VERIFICATION'
    );
    // props for sending mail --
    await sendMail({
      token: verificationToken.token,
      username: existingUser.name as string,
      userMail: existingUser.email,
      emailType: "verification"
    })
      .then((res) => console.log("MAIL SUCCESS", res))
      .catch(() => {
        return { error: "Error While sending the Mail.." };
      });
    return { success: "Confirmation Email Sent" };
  }
  // if user's two factor authentication is enabled
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    console.log("before");
    const twoFactorConfirmation = await generateVerificationToken(existingUser.email, 'TWOFACTOR');
    console.log("after");
    await sendMail({
      emailType: "two-factor",
      token: twoFactorConfirmation.token,
      userMail: existingUser.email,
      username: existingUser.name || "User"
    });
    return { twoFactor: true };
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

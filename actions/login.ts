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
  console.log("there");
  await sendMail()
    .then((res) => console.log("MAIL SUCCESS", res))
    .catch((err) => console.log("MAIL ERROR", err));
  console.log("here");
  const { email, password, code } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  // CHECK --- if user exist and user has not logged in with other providers
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }
  // if user exist but the email is not verified
  if (existingUser?.emailVerified) {
    const varificationToken = await generateVerificationToken(
      existingUser.email
    );

    return { success: "Confirmation Email Sent" };
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
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
  return { success: "Success" };
};

"use server";

import { getUserByEmail } from "@/data/user";
import { sendMail } from "@/lib/sendmail";
import { generateVerificationToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid Email !",
    };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "Email not found !",
    };
  }
  const passwordResetToken = await generateVerificationToken(
    email,
    "RESETPASSWORD",
    existingUser.id
  );
  await sendMail({
    emailType: "password-reset",
    token: passwordResetToken.token,
    userMail: passwordResetToken.email,
    username: existingUser.name || "",
  });
  return {
    success: "Reset Email sent !",
  };
};

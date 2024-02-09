"use server";
import * as z from "zod";
import bcryptjs from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendMail } from "@/lib/sendmail";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);
  // const existingUser = await getUserByEmail(email);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }
  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  // TODO: send verification token email
  const verificationToken = await generateVerificationToken(
    email,
    "VERIFICATION",
    newUser.id
  );
  // props for mail
  await sendMail({
    token: verificationToken.token,
    username: newUser.name as string,
    userMail: newUser.email as string,
    emailType: "verification",
  })
    .then((res) => console.log("MAIL SUCCESS", res))
    .catch(() => {
      return { error: "Error While sending the Mail.." };
    });
  return {
    success: "Confirmation email sent!",
    verificationToken: verificationToken.token,
  };
};

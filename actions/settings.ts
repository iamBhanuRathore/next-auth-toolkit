"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { UserRole } from "@prisma/client";
import { getUserByEmail, getUserById } from "@/data/user";
import { SettingsSchema } from "@/schemas";
import { useServerUser } from "@/hooks/use-server-user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendMail } from "@/lib/sendmail";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await useServerUser();
  if (!user) {
    return {
      error: "Unauthorized!",
    };
  }
  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return {
      error: "Unauthorized!",
    };
  }
  // if user is logged in through OAuth then we dont want him to update these field
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // if a user want to change his/her email
  if (values.email && values.email !== user.email) {
    // first we check that the new email is used by some other user or not
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Already a user exist with this Email" };
    }
    const verificationToken = await generateVerificationToken(
      values.email,
      "VERIFICATION",
      dbUser.id
    );
    await sendMail({
      token: verificationToken.token,
      emailType: "verification",
      userMail: verificationToken.email,
      username: user.name || "",
    });
    return {
      success: "Verification Email Sent on new Email!",
      error: "Email can be changed separately !",
    };
  }
  // updating the password -- Also checking dbuser.password so that only Non-OAuth users can change their password because OAuth user don't have password
  if (values.password && values.newPassword && dbUser.password) {
    const matchPassword = await bcryptjs.compare(
      values.password,
      dbUser.password
    );
    if (!matchPassword) {
      return { error: "Incorrect Password !" };
    }
    const hashedPassword = await bcryptjs.hash(values.newPassword, 10);
    values.password = hashedPassword;
  } else {
    values.password = undefined;
  }
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      name: values.name,
      isTwoFactorEnabled: values.isTwoFactorEnabled,
      role: values.role as UserRole, // Little error in types in zod
      password: values.password,
    },
  });
  return {
    success: "Settings Updated!",
  };
};

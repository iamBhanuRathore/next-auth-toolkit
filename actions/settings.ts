"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { SettingsSchema } from "@/schemas";
import { useServerUser } from "@/hooks/use-server-user";

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
  // if user is logged in through OAuth then we dont want him to update these filed
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }
  // if a user want to change his email
  if (values.email !== user.email) {
  }
  console.log(values);
  // await db.user.update({
  //   where: {
  //     id: dbUser.id,
  //   },
  //   data: {
  //     ...values,
  //   },
  // });
  return {
    success: "Settings Updated!",
  };
};

"use server";
import { getUserById } from "@/data/user";
import { useServerUser } from "@/hooks/use-server-user";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";

export const settings = async (
  values: Pick<z.infer<typeof SettingsSchema>, "name">
) => {
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
  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });
  return {
    success: "Settings Updated!",
  };
};

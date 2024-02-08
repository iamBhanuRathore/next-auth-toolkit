"use server";

import { useServerUser } from "@/hooks/use-server-user";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const server = await useServerUser();
  if (!server) return { error: "No Seesion Found" };
  if (server?.role === UserRole.USER)
    return { error: "Forbidden Server Action!" };
  if (server?.role === UserRole.ADMIN)
    return { success: "Allowed Server Action!" };
};

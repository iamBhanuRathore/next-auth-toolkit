"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // it is useful when we want to some server stuff before logout like removing the session and also some analytics for the data
  await signOut();
};

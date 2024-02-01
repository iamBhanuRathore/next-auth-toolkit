"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Token does not exist !",
    };
  }
  const hasExpired = new Date(existingToken.expire) < new Date();

  if (hasExpired) {
    return {
      error: "Token has expired",
    };
  }
  const existingUser = await getUserByEmail(existingToken.email);
};

"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  // finding token in verification table
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
  // finding user by the email got from the verification token table
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return {
      error: "Email does not exist",
    };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email, // we dont-have to update this on registration but when we update the user email through token then we have to update this which is a same process thats why we updating them in this so that we can reuse this same action again
    },
  });
  // after updating the mail we can simply delete the verification token from the database
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return {
    success: "Email Verified !",
  };
};

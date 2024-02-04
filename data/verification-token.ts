import { db } from "@/lib/db";
import { TokenType } from "@prisma/client";

export const getVerificationTokenByToken = async (token: string, tokenType: TokenType) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token_tokenType: { token, tokenType } },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string, tokenType: TokenType) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { email_tokenType: { email, tokenType } },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";

import { db } from "@/lib/db";
import { TokenType } from "@prisma/client";

export const generateVerificationToken = async (
  email: string,
  tokenType: TokenType,
  userId: string
) => {
  // If we are using token for a two factor authentication then we need the token to be readable by human so we create a otp or on other type verification we create a non human readable token because we are authenticating it by ourself
  let token: string;
  if (tokenType === "TWOFACTOR") {
    token = crypto.randomInt(100_000, 1_000_000).toString();
  } else {
    token = uuidv4();
  }
  // const token = uuidv4();
  const expire = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes
  // console.log(email, token, tokenType, expire);
  const verficationToken = await db.verificationToken.upsert({
    where: {
      email_tokenType: {
        email,
        tokenType,
      },
    },
    update: {
      userId,
      token,
      expire,
    },
    create: {
      tokenType,
      userId,
      email,
      expire,
      token,
    },
  });

  // ANOTHER APPROACH

  //   const existingToken = await getVerificationTokenByEmail(email);
  //   if (existingToken) {
  //     await db.verificationToken.delete({
  //       where: {
  //         id: existingToken.id,
  //       },
  //     });
  //   }
  //   const verficationToken = await db.verificationToken.create({
  //     data: {
  //       email,
  //       token,
  //       expire,
  //     },
  //   });

  return verficationToken;
};

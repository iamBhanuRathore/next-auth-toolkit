'use server';

import { z } from "zod";
import bcryptjs from 'bcryptjs';
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { NewPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";


export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token: string | null) => {
    if (!token) {
        return {
            error: "Missing Token!"
        };
    }
    const validatedFields = NewPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalid Password!"
        };
    }
    const { password } = validatedFields.data;
    const existingToken = await getVerificationTokenByToken(token, 'RESETPASSWORD');
    if (!existingToken) {
        return {
            error: "Invalid Token!"
        };
    }
    const hasExpired = new Date(existingToken.expire) < new Date();
    if (hasExpired) {
        return {
            error: "Token is expired!"
        };
    }
    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            error: "Email does not Exist!"
        };
    }
    const hashedpassword = await bcryptjs.hash(password, 10);
    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedpassword
        }
    });
    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        }
    });
    return {
        success: "Password Updated successfully"
    };
};
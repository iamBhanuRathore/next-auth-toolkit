'use server';

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            error: "Invalidate Email !"
        };
    }
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return {
            error: "Email not found !"
        };
    }
    // Todo: Generate token and send mail
    return {
        success: "Reset Email sent !"
    };
};
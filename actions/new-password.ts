"use server";

import * as z from "zod";

import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByEmail, getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newPassword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token?: string | null,
) => {
    if(!token) {
        return { error: "Missing token!" };
    }

    const validateFields = NewPasswordSchema.safeParse(values);

    if(!validateFields.success) {
        return { error: "Invalid fields!" };
    }

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return { error: "Token has expired!" };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser) {
        return { error: "User does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await db.$transaction(async (trx) => {
            await trx.user.update({
                where: { id: existingUser.id },
                data: { password: hashedPassword }
            });

            await trx.passwordResetToken.delete({
                where: { id: existingToken.id }
            });
        });

        return { success: "Password updated successfully. You will be redirected..." };
    } catch (error) {
        console.error("Error updating password:", error);
        return { error: "Failed to update password. Please try again." };
    }
}
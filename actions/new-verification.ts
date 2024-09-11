"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if(!existingToken) {
        return { error : "Le token n'existe pas!"};
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired) {
        return { error : "Le token a expiré!"};
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser) {
        return { error : "L'email n'existe pas!"};
    }

    await db.user.update({
        where: { id : existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email // use for settings user : change email
        }
    });

    await db.verificationToken.delete({
        where: { id : existingToken.id }
    });

    return { success : "L'email a été vérifié"};
}
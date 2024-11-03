import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        });

        return user;
    } catch {
        return null;
    }
}


export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });

        return user;
    } catch {
        return null;
    }
}

export const getAllUsers = async () => {
    try {
        const users = await db.user.findMany({
            include: {
                accounts: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return users.map(user => ({
            ...user,
            isOAuth: user.accounts.length > 0
        }));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}
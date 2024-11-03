"use server";

import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";

export const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
        const role = await currentRole();
        
        if (role !== UserRole.ADMIN) {
            return { error: "Unauthorized" };
        }

        await db.user.update({
            where: { id: userId },
            data: { role: newRole }
        });
        
        return { success: "Role updated successfully" };
    } catch (error) {
        console.error("Error updating role:", error);
        return { error: "Something went wrong" };
    }
}
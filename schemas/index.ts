import { UserRole } from "@prisma/client";
import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password : z.string().min(6, {
        message: "Minimum 6 characters is required"
    }),
    code: z.optional(z.string())
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password : z.string().min(6, {
        message: "Minimum 6 characters is required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
});

export const NewPasswordSchema = z.object({
    password : z.string().min(6, {
        message: "Minimum 6 characters is required"
    }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const SettingsSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        if(data.password && 
            (data.newPassword == "" || data.newPassword == undefined)
        ) {
            return false;
        }

        return true;
    }, {
        message: "New password is required",
        path: ["newPassword"]
    })
    .refine((data) => {
        if((data.password == "" || data.password == undefined) && 
            data.newPassword
        ) {
            return false;
        }

        return true;
    }, {
        message: "Password is required",
        path: ["password"]
    })
    .refine((data) => {
        if (data.password && data.newPassword && data.password === data.newPassword) {
            return false;
        }
    
        return true;
    }, {
        message: "New password must be different from the current password",
        path: ["newPassword"]
    });
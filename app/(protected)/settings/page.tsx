"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, useEffect, useRef } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { settings } from "@/actions/settings";
import { useSession } from "next-auth/react";
import { SettingsSchema } from "@/schemas";
import { 
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

const SettingsPage = () => {
    const user = useCurrentUser();

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [showContent, setShowContent] = useState(false);

    const passwordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);

    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined
        },
        mode: "onChange" 
    });

    const { watch, setValue } = form;

    const password = watch("password");
    const newPassword = watch("newPassword");

    useEffect(() => {
        //avoids having the password field pre-filled by the browser
        const timer = setTimeout(() => {
            setShowContent(true);
            if (passwordRef.current) passwordRef.current.value = '';
            if (newPasswordRef.current) newPasswordRef.current.value = '';
        }, 100); // 100ms delay

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if((password === "" || password === undefined) &&
            (newPassword === "" || newPassword === undefined) ) {
            setValue("password", undefined, { shouldValidate: true });
            setValue("newPassword", undefined, { shouldValidate: true });
            form.clearErrors("password");
            form.clearErrors("newPassword");
        }
    }, [password, newPassword, form, setValue]);

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            settings(values)
                .then((data) => {
                    if(data.error) {
                        setError(data.error);
                    }
                    if(data.success) {
                        update();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError("Something went wrong!"));
        });
    };

    if (!showContent) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex bg-background">
            <div className="flex flex-col flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Account</h3>
                        <p className="text-sm text-muted-foreground">
                        Update your account settings
                        </p>
                    </div>
                    <Separator />
                    <Form {...form}>
                        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                    <Input 
                                        {...field}
                                        placeholder="John Doe"
                                        disabled={isPending}
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            {user?.isOAuth === false && (
                                <>
                                <FormField 
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="john.doe@example.com"
                                            type="email"
                                            disabled={isPending}
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                            ref={passwordRef}
                                            autoComplete="new-password"
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField 
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                        <Input 
                                            {...field}
                                            placeholder="******"
                                            type="password"
                                            disabled={isPending}
                                            ref={newPasswordRef}
                                            autoComplete="new-password"
                                        />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                </>
                            )}
                            {user?.isOAuth === false && (
                                <FormField 
                                control={form.control}
                                name="isTwoFactorEnabled"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Two Factor Authentication</FormLabel>
                                        <FormDescription>
                                        Enable two factor authentication for your account
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch 
                                        disabled={isPending}
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    </FormItem>
                                )}
                                />
                            )}
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button 
                                disabled={isPending}
                                type="submit"
                            >
                                Update account
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
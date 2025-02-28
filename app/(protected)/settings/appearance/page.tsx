"use client";

import { Separator } from "@/components/ui/separator";
import { AppearanceForm } from "./appearance-form";

const AppearancePage = () => {
    return ( 
        <div className="flex bg-background">
            <div className="flex flex-col flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">Appearance</h3>
                        <p className="text-sm text-muted-foreground">
                            Customize the appearance of the app. Automatically switch between light
                            and dark themes
                        </p>
                    </div>
                    <Separator />
                    <AppearanceForm />
                </div>
            </div>
        </div>
    );
}
 
export default AppearancePage;
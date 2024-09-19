"use client";

import { Separator } from "@/components/ui/separator";
import LicenseForm from "./license-form";

const LicensePage = () => {
    return ( 
        <div className="flex bg-background">
            <div className="flex flex-col flex-grow items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-2xl space-y-6">
                    <div>
                        <h3 className="text-lg font-medium">My License</h3>
                        <p className="text-sm text-muted-foreground">
                            View and manage your license information
                        </p>
                    </div>
                    <Separator />
                    <LicenseForm />
                </div>
            </div>
        </div>
    );
}
 
export default LicensePage;
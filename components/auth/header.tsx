import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

interface HeaderProps {
    label: string;
}

export const Header = ({
    label
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 overflow-hidden">
                        <Logo />
                    </div>
                    <h1 className={cn(
                        "text-2xl font-semibold",
                        font.className
                    )}>
                        DATAGURU
                    </h1>
                </div>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    );
};



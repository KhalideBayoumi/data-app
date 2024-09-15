"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Menu,
    Search,
} from "lucide-react";
import Logo from "@/components/logo";
import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import CompanySearch from "./company-search";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <div className="fixed top-0 left-0 right-0 z-50 border-b">
            <header className="flex h-16 items-center gap-4 bg-background max-w-[1440px] mx-auto">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Logo />
                    </Link>
                    <Link
                        href="/dashboard"
                        className={`transition-colors hover:text-foreground ${
                            pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className={`transition-colors hover:text-foreground ${
                            pathname === "#" ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                        Analyse
                    </Link>
                    <Link
                        href="#"
                        className={`transition-colors hover:text-foreground ${
                            pathname === "#" ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                        Compare
                    </Link>
                    <Link
                        href="#"
                        className={`transition-colors hover:text-foreground ${
                            pathname === "#" ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                        Screen
                    </Link>
                    <Link
                        href="#"
                        className={`transition-colors hover:text-foreground ${
                            pathname === "#" ? "text-foreground" : "text-muted-foreground"
                        }`}
                    >
                        Glossary
                    </Link>
                    <RoleGate allowedRole={UserRole.ADMIN}>
                        <Link
                            href="/admin"
                            className={`transition-colors hover:text-foreground ${
                                pathname === "#" ? "text-foreground" : "text-muted-foreground"
                            }`}
                        >
                            Administration
                        </Link>
                    </RoleGate>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                        <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                DATAGURU
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Analyse
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Compare
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Screen
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Glossary
                            </Link>
                            <RoleGate allowedRole={UserRole.ADMIN}>
                                <Link
                                    href="/admin"
                                    className={`transition-colors hover:text-foreground ${
                                        pathname === "#" ? "text-foreground" : "text-muted-foreground"
                                    }`}
                                >
                                    Administration
                                </Link>
                            </RoleGate>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <CompanySearch />
                    {/*<ThemeToggle />*/}
                </div>
                <UserButton />
            </header>
        </div>
    )
}
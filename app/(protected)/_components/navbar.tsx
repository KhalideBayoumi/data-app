"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
    Menu,
    Search,
  } from "lucide-react";
import Logo from "@/components/logo";

export const Navbar = () => {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
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
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search companies..."
                        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    />
                    </div>
                </form>
                {/*<ThemeToggle />*/}
            </div>
            <UserButton />
        </header>
    )
}
"use client"

import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import SignoutBtn from "./signout-btn";
import { useSession } from "@/lib/auth/auth-client";

export default function Navbar() {

    const { data: session } = useSession();

    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto h-16 flex px-4 justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <Briefcase />
                    <span>JobTracker</span>
                </Link>

                {/* Right Side */}
                {
                    session?.user ? (
                        <div className="flex items-center gap-4">

                            {/* Dashboard Button */}
                            <Link href="/dashboard">
                                <Button
                                    variant="ghost"
                                    className="text-gray-700 hover:text-black"
                                >
                                    Dashboard
                                </Button>
                            </Link>

                            {/* Avatar + Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="flex items-center cursor-pointer focus:outline-none">
                                        <Avatar.Root className="w-9 h-9">
                                            <Avatar.Fallback className="w-full h-full flex items-center justify-center rounded-full bg-primary text-white text-sm font-medium hover:opacity-80 transition">
                                                {session.user.name?.[0]?.toUpperCase()}
                                            </Avatar.Fallback>
                                        </Avatar.Root>
                                    </button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        <div>
                                            <p className="font-medium">{session.user.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {session.user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>

                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>

                                    <SignoutBtn />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    ) : (
                        <div className="flex gap-2">
                            <Link href="/sign-in">
                                <Button variant="outline" className="text-gray-700 hover:text-black">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button variant="outline" className="text-gray-700 hover:text-black">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )
                }

            </div>
        </nav>
    );
}
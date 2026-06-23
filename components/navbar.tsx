import { Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
    return (

        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto h-16 flex px-4 justify-between items-center">
                <Link href="/" className="flex items-cdenter gap-2 text-xl font-semibold text-primary">
                    <Briefcase />
                    <span>JobTracker</span>
                </Link>
                <div className="flex gap-2">
                    <Link href="/sign-in"><Button variant="outline" className="text-gray-700 hover:text-black">Sign In</Button></Link>
                    <Link href="/sign-up"><Button variant="outline" className="text-gray-700 hover:text-black">Sign Up</Button></Link>
                </div>
            </div>
        </nav>
    )
}
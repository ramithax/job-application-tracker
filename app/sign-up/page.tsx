"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { signUp } from "@/lib/auth/auth-client"
import { useRouter } from "next/navigation"

export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleSignUp(e: React.FormEvent) {

        e.preventDefault();

        setError("");

        if (password != confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!email || !password || !name) {
            setError("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const response = await signUp.email({
                name,
                email,
                password
            })

            if (response.error) {
                setError(response.error.message ?? "Failed to sign up");
            }
            else {
                router.push("/dashboard")
            }

        } catch (error: any) {
            setError(error.message);

        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">

            <Card className="w-full max-w-md border border-gray-200 shadow-md">

                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
                        Sign Up
                    </CardTitle>
                    <CardDescription className="text-gray-500 text-center">
                        Create an account to get started
                    </CardDescription>
                </CardHeader>

                <form className="space-y-4" onSubmit={handleSignUp}>

                    <CardContent className="space-y-5">

                        {
                            error && (
                                <div className="text-red-500 text-sm text-center">{error}</div>
                            )
                        }

                        <div className="space-y-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" type="text" placeholder="John Doe" required
                                value={name}
                                onChange={
                                    (e) => {
                                        setName(e.target.value);
                                    }
                                } />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="john@example.com" required
                                value={email}
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value);
                                    }
                                } />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="••••••••" required
                                value={password}
                                onChange={
                                    (e) => {
                                        setPassword(e.target.value);
                                    }
                                } />
                        </div>

                        <div className="space-y-3">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" name="confirmPassword" type="password" placeholder="••••••••" required
                                value={confirmPassword}
                                onChange={
                                    (e) => {
                                        setConfirmPassword(e.target.value);
                                    }
                                } />
                        </div>

                    </CardContent>

                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading ? "Signing Up..." : "Sign Up"}
                        </Button>

                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <Link
                                className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                                href="/sign-in"
                            >
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>

                </form>
            </Card>
        </div>
    )
}
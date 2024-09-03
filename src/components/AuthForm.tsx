"use client";

import { getSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useSession } from "next-auth/react";

export function LogInButton() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            router.push(`/profile/${session.user.id}`);
        }
    }, [status, session, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        console.log("SignIn result:", result);
        if (result?.error) {
            console.error("SignIn error:", result.error);
            alert(result.error);
        } else if (result?.ok) {
            console.log("SignIn successful, redirecting...");
            // You might want to force a session refresh here
            await getSession();
        } else {
            console.error("Unexpected SignIn result:", result);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-4xl w-full mx-auto flex">
                {/* Left side: Placeholder for future image */}
                <div className="w-1/2 bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-lg font-semibold">Image Placeholder</p>
                </div>

                {/* Right side: Login form */}
                <div className="w-1/2 p-8">
                    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Log In</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                                           focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300">
                            Log in
                        </button>
                    </form>
                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => signIn('google')}
                                className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-base font-medium text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                            >
                                <FcGoogle className="w-6 h-6 mr-3" />
                                Sign in with Google
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <Link href="/register" className="text-sm text-gray-500 hover:text-blue-500 hover:underline transition-colors duration-300">
                            Don't have an account? Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LogOutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="text-gray-600 bg-white border-2 border-blue-500 rounded-full px-4 py-2 font-medium transition duration-300 hover:text-white hover:bg-blue-500 hover:scale-105"
        >
            Log Out
        </button>
    );
}

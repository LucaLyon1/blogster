"use client";

import { signIn, signOut } from "next-auth/react";

export const LogInButton = () => {
    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => signIn()}>
            Sign In
        </button>
    )
}
export const LogOutButton = () => {
    return (
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => signOut()}>
            Log out
        </button>
    )
}
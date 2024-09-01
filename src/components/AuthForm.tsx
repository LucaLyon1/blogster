"use client";

import { signIn, signOut } from "next-auth/react";

export const LogInButton = () => {
    return (
        <button onClick={() => signIn()}>
            Sign In
        </button>
    )
}
export const LogOutButton = () => {
    return (
        <button onClick={() => signOut()}>
            Log out
        </button>
    )
}
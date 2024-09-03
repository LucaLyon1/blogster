import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { decode, encode } from "next-auth/jwt"

export const { auth, handlers } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    jwt: { encode, decode },
    providers: [
        Google,
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log("Authorize function called with credentials:", credentials);
                if (!credentials?.email || !credentials?.password) {
                    console.log("Missing email or password");
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                console.log("User found:", user);
                if (!user || !user.password) {
                    console.log("User not found or password not set");
                    return null;
                }
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                console.log("Is password valid:", isPasswordValid);
                if (!isPasswordValid) {
                    console.log("Invalid password");
                    return null;
                }
                console.log("Authorization successful, returning user:", user);
                return user; // Remove the await user.json() and just return the user object
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            console.log("Session callback called with session:", session, "and token:", token);
            if (token.id) {
                session.user.id = token.id;
            }
            return session;
        },
        async jwt({ token, user }) {
            console.log("JWT callback called with token:", token, "and user:", user);
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
    },
    debug: true, // Enable debug mode
})

export async function registerUser(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return newUser;
}
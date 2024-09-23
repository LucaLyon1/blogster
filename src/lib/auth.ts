import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { decode, encode } from "next-auth/jwt"
import { stripe } from "./stripe"

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
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string }
                });
                if (!user || !user.password) {
                    return null;
                }
                const isPasswordValid = await bcrypt.compare(credentials.password as string, user.password as string);
                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.id && token.role) {
                session.user.id = token.id as string;
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id as string;
                token.role = user.role;
            }
            return token;
        },
    },
    pages: {
        signIn: '/login',
    },
    debug: false, // Enable debug mode
    events: {
        createUser: async ({ user }) => {
            if (!user.id || !user.email) {
                console.error('User ID or email is missing');
                return;
            }
            try {
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: user.name ?? undefined,
                });

                await prisma.user.update({
                    where: { id: user.id },
                    data: { stripeCustomerId: customer.id }
                });
            } catch (error) {
                console.error('Error creating Stripe customer or updating user:', error);
            }
        }
    }
})

export async function registerUser(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    if (!newUser.id || !newUser.email) {
        console.error('User ID or email is missing');
        return;
    }
    try {
        const customer = await stripe.customers.create({
            email: newUser.email,
            name: newUser.name ?? undefined,
        });

        await prisma.user.update({
            where: { id: newUser.id },
            data: { stripeCustomerId: customer.id }
        });
    } catch (error) {
        console.error('Error creating Stripe customer or updating user:', error);
    }
    return newUser;
}
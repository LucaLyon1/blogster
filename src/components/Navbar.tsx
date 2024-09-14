'use client'

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LogOutButton } from './AuthForm';
import { Roboto_Slab } from 'next/font/google';
import { usePathname, useSearchParams } from 'next/navigation';

export const robotoSlab = Roboto_Slab({
    subsets: ['latin'],
    display: 'swap',
});

export default function Navbar() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div className='py-8'>
            <nav className="fixed top-0 w-full bg-white border-b border-gray-200 shadow-sm flex justify-between items-center py-4 px-6 md:px-12 lg:px-20">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <div className={`${robotoSlab.className} text-3xl font-bold text-blue-600`}>Finnnest.</div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline" href="/learn-more">
                        Product
                    </Link>
                    <Link className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline" href="/job-board">
                        Job Board
                    </Link>
                    {session?.user && (
                        <>
                            <Link className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline" href="/recruiter">
                                My Offers
                            </Link>
                            <Link className="text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline" href={`/profile/${session.user.id}`}>
                                Profile
                            </Link>
                        </>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    {/* Create Job Offer Button */}
                    <Link href='/create-offer' className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 shadow-md border-2 border-blue-500">
                        Create Job Offer
                    </Link>
                    {session?.user ? (
                        <LogOutButton />
                    ) : (
                        <Link
                            href={`/login?callbackUrl=${encodeURIComponent(pathname + (searchParams ? '?' + searchParams.toString() : ''))}`}
                            className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition duration-300 transform hover:scale-105"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Button (hidden on larger screens) */}
                <button className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </nav>
        </div>
    );
};


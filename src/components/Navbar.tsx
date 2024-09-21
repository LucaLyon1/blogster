'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LogOutButton } from './AuthForm';
import { Roboto_Slab } from 'next/font/google';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export const robotoSlab = Roboto_Slab({
    subsets: ['latin'],
    display: 'swap',
});

export default function Navbar() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NavbarContent />
        </Suspense>
    );
}

function NavbarContent() {
    const { data: session } = useSession();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className=" top-0 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <div className={`${robotoSlab.className} text-3xl font-bold text-blue-600`}>Finnnest.</div>
                    </Link>

                    {/* Navigation Links - Desktop */}
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

                    {/* Action Buttons - Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-4 pt-2 pb-3 space-y-2">
                        <Link className="block text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline py-2" href="/learn-more">
                            Product
                        </Link>
                        <Link className="block text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline py-2" href="/job-board">
                            Job Board
                        </Link>
                        {session?.user && (
                            <>
                                <Link className="block text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline py-2" href="/recruiter">
                                    My Offers
                                </Link>
                                <Link className="block text-gray-700 hover:text-blue-600 font-medium transition duration-300 hover:underline py-2" href={`/profile/${session.user.id}`}>
                                    Profile
                                </Link>
                            </>
                        )}
                        <div className="flex flex-col space-y-2 mt-4">
                            <Link href='/create-offer' className="text-center text-gray-600 bg-white border-2 border-blue-500 rounded-full px-4 py-2 font-medium transition duration-300 hover:text-white hover:bg-blue-500">
                                Create Job Offer
                            </Link>
                            {session?.user ? (
                                <LogOutButton />
                            ) : (
                                <Link
                                    href={`/login?callbackUrl=${encodeURIComponent(pathname + (searchParams ? '?' + searchParams.toString() : ''))}`}
                                    className="text-center text-gray-600 bg-white border-2 border-blue-500 rounded-full px-4 py-2 font-medium transition duration-300 hover:text-white hover:bg-blue-500"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

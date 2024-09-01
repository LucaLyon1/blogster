import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { LogInButton, LogOutButton } from './AuthForm';
import { auth } from '@/lib/auth';

async function Navbar() {
    const session = await auth();

    return (
        <div className='py-10'>
            <nav className="fixed top-0 w-full bg-white shadow-md flex justify-between items-center py-4 px-60">
                {/* Logo - to be defined later */}
                <Link href="/">
                    <div className="text-xl font-bold">Logo</div>
                </Link>

                {/* Navigation Links */}
                <Link className="text-gray-700 hover:text-gray-900" href="/product">
                    Product
                </Link>
                <Link className="text-gray-700 hover:text-gray-900" href="/job-board">
                    Job Board
                </Link>
                <Link className="text-gray-700 hover:text-gray-900" href="/recruiter">
                    My Offers
                </Link>

                {/* Create Job Offer Button */}
                <Link href='/create-offer' className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                    Create Job Offer
                </Link>

                {session?.user ? <LogOutButton /> : <LogInButton />}
            </nav>
        </div>
    );
};

export default Navbar;


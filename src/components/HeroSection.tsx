import { Roboto, Roboto_Slab } from "next/font/google";
import Link from "next/link";
import LoginModal from "./LoginModal";

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const robotoSlab = Roboto_Slab({
    weight: ['600'],
    subsets: ['latin'],
    display: 'swap',
});

function HeroSection() {
    return (
        <>
            <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-32">
                <div className="container mx-auto px-6 text-center">
                    <h1 className={`${robotoSlab.className} text-5xl font-bold text-gray-800 mb-6`}>Hire Smarter, Faster, and More Accurately</h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Custom Skill Tests and Resume Access for Effortless Candidate Screening
                    </p>
                    <div className="flex justify-center space-x-6">
                        <LoginModal />
                        <Link href="/job-board" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-blue-600">
                            I am a candidate
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HeroSection;
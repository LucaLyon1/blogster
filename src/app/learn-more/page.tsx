import { Roboto, Roboto_Slab } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaUserTie, FaChartLine, FaUsers, FaLightbulb } from 'react-icons/fa';

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

export default function LearnMore() {
    return (
        <div className={`${roboto.className} min-h-screen`}>
            <main>
                <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
                    <div className="container mx-auto px-4">
                        <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">Welcome to <span className={`${robotoSlab.className} text-blue-600`}>finnnest.</span></h1>
                        <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
                            Revolutionizing recruitment by putting skills at the forefront. We're transforming the hiring process with comprehensive testing and instant insights for both candidates and recruiters.
                        </p>
                    </div>
                </section>

                <section className="bg-white py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Comprehensive Test Creation</h2>
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="md:w-1/2 md:pr-12">
                                <p className="text-gray-600 mb-6">
                                    Create tailored assessments that truly measure candidate potential. Our platform offers:
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Customizable test parameters for any role
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Extensive library of predefined tests
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        Multiple assessment types: psychological, logical, technical, and industry-specific
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/2 mt-8 md:mt-0">
                                <Image src="/test-creation.png" alt="Test Creation" width={500} height={300} className="rounded-lg shadow-lg" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gray-100 py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Instant Results for Enhanced Experience</h2>
                        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
                            <div className="md:w-1/2 bg-white rounded-xl shadow-xl p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                    <FaUser className="text-blue-500 mr-2" />
                                    For Candidates:
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Enjoy a more engaging and transparent recruitment process with immediate feedback on your performance.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-600">
                                        <FaChartLine className="w-5 h-5 mr-2 text-green-500" />
                                        Instant performance feedback
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <FaLightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                                        Insights into your strengths and areas for improvement
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <FaUsers className="w-5 h-5 mr-2 text-purple-500" />
                                        Transparent and fair evaluation process
                                    </li>
                                </ul>
                            </div>
                            <div className="md:w-1/2 bg-white rounded-xl shadow-xl p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                    <FaUserTie className="text-blue-500 mr-2" />
                                    For Recruiters:
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Access a comprehensive dashboard providing:
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-600">
                                        <FaChartLine className="w-5 h-5 mr-2 text-blue-500" />
                                        Real-time performance analytics
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <FaUsers className="w-5 h-5 mr-2 text-green-500" />
                                        Easy comparison of candidates
                                    </li>
                                    <li className="flex items-center text-gray-600">
                                        <FaLightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                                        Multi-dimensional candidate insights
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-blue-50 py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Streamlined Candidate Management</h2>
                        <div className="bg-white rounded-xl shadow-xl p-8">
                            <p className="text-gray-600 mb-8 text-center">
                                <span className={robotoSlab.className}>finnnest.</span> simplifies your hiring process with easy access to comprehensive candidate profiles, integrating seamlessly with your existing HR tools.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="text-center">
                                    <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Comprehensive Profiles</h3>
                                    <p className="text-gray-600">All candidate data in one place</p>
                                </div>
                                <div className="text-center">
                                    <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Integration</h3>
                                    <p className="text-gray-600">Works with your existing HR tools</p>
                                </div>
                                <div className="text-center">
                                    <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Efficient Decision-Making</h3>
                                    <p className="text-gray-600">Make informed choices faster</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-br from-blue-500 to-indigo-600 py-20 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-6">Transform your recruitment strategy with <span className={robotoSlab.className}>finnnest.</span></h2>
                        <Link href="/create-offer">
                            <button className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300">
                                Get Started Now
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}

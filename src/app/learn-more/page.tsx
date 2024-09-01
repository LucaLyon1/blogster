import { Roboto } from 'next/font/google';
import Image from 'next/image';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function LearnMore() {
    return (
        <div className={`${roboto.className} bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen`}>
            <main className="container mx-auto px-4 py-16">
                <h1 className="text-5xl font-bold text-center text-gray-800 mb-16">Revolutionize Your Hiring Process</h1>

                {/* Custom Skill Tests Section */}
                <section className="mb-24 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 md:pr-12">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create Custom Skill Tests</h2>
                        <p className="text-gray-600 mb-6">
                            Empower your recruitment with tailored assessments that precisely match your job requirements. Our intuitive test builder allows you to:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Design industry-specific questions
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Choose from various question types
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                Set custom parameters and difficulty levels
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <Image src="/images/custom-tests.svg" alt="Custom Skill Tests" width={500} height={300} className="rounded-lg shadow-lg" />
                    </div>
                </section>

                {/* Candidate Dashboard Section */}
                <section className="mb-24 flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 md:pl-12">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Comprehensive Candidate Dashboard</h2>
                        <p className="text-gray-600 mb-6">
                            Gain powerful insights with our intuitive dashboard, providing you with all the data you need to make informed decisions:
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                Overview of all applicants and scores
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                Detailed performance breakdowns
                            </li>
                            <li className="flex items-center text-gray-600">
                                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                Advanced filtering and comparison tools
                            </li>
                        </ul>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <Image src="/images/dashboard.svg" alt="Candidate Dashboard" width={500} height={300} className="rounded-lg shadow-lg" />
                    </div>
                </section>

                {/* Premium Reporting Section */}
                <section className="mb-24">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Advanced Premium Reporting</h2>
                    <div className="bg-white rounded-xl shadow-xl p-8">
                        <p className="text-gray-600 mb-8 text-center">
                            Unlock the full potential of your recruitment data with our premium reporting features:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Analytics</h3>
                                <p className="text-gray-600">Gain deeper insights into candidate performance trends</p>
                            </div>
                            <div className="text-center">
                                <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">Custom Templates</h3>
                                <p className="text-gray-600">Create and save your own reporting templates</p>
                            </div>
                            <div className="text-center">
                                <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Insights</h3>
                                <p className="text-gray-600">Receive intelligent candidate recommendations</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

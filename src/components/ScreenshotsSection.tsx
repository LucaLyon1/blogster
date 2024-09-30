import Image from "next/image";
import { FaSmile, FaUserFriends, FaChartBar } from 'react-icons/fa';
import { Roboto_Slab } from 'next/font/google';

const robotoSlab = Roboto_Slab({
    weight: ['600'],
    subsets: ['latin'],
    display: 'swap',
});

function ScreenshotsSection() {
    return (
        <section className="bg-gray-50 py-20">
            <div className="container mx-auto px-6">
                <h2 className={`${robotoSlab.className} text-3xl font-bold text-gray-800 mb-12 text-center`}>Experience finnnest in Action</h2>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0 md:space-x-12">
                    <div className="w-full md:w-1/2">
                        <div className="aspect-w-3 aspect-h-2 mb-6">
                            <Image
                                src="/test-question-screenshot.png"
                                alt="Example of a fun test question"
                                width={600}
                                height={400}
                                objectFit="cover"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Engaging Candidate Experience</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center"><FaSmile className="text-blue-500 mr-2" /> Interactive and enjoyable skill assessments</li>
                            <li className="flex items-center"><FaUserFriends className="text-blue-500 mr-2" /> User-friendly interface for seamless test-taking</li>
                            <li className="flex items-center"><FaChartBar className="text-blue-500 mr-2" /> Immediate feedback to keep candidates informed</li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="aspect-w-3 aspect-h-2 mb-6">
                            <Image
                                src="/recruiter-dashboard-screenshot.png"
                                alt="Recruiter dashboard with multidimensional chart"
                                width={600}
                                height={400}
                                objectFit="cover"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-4">Powerful Recruiter Insights</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center"><FaChartBar className="text-blue-500 mr-2" /> Comprehensive dashboard for at-a-glance candidate evaluation</li>
                            <li className="flex items-center"><FaChartBar className="text-blue-500 mr-2" /> Multidimensional charts for in-depth skill analysis</li>
                            <li className="flex items-center"><FaChartBar className="text-blue-500 mr-2" /> Data-driven decision-making tools</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScreenshotsSection;
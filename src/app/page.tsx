import Link from "next/link";
import Image from "next/image";
import { Roboto, Roboto_Slab } from 'next/font/google';
import { LogInButton } from "@/components/AuthForm";
import { FaSmile, FaUserFriends, FaChartBar } from 'react-icons/fa';

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

export default function Home() {
  return (
    <div className={roboto.className}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className={`${robotoSlab.className} text-5xl font-bold text-gray-800 mb-6`}>Hire Smarter, Faster, and More Accurately</h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Custom Skill Tests and Resume Access for Effortless Candidate Screening
          </p>
          <div className="flex justify-center space-x-6">
            <Link href="/learn-more" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              I am recruiting
            </Link>
            <Link href="/job-board" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-blue-600">
              I am a candidate
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 inline-block mb-4">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Custom Tests</h3>
              <p className="text-gray-600">Tailor skill assessments to your specific needs, ensuring you find the perfect fit for your team.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 inline-block mb-4">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Filter Applicants with Ease</h3>
              <p className="text-gray-600">Efficiently manage high volumes of applications, saving time and resources in your hiring process.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-6 inline-block mb-4">
                <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Candidate-Friendly Process</h3>
              <p className="text-gray-600">Provide a smooth, engaging experience that candidates will appreciate, enhancing your employer brand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
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

      <section className="bg-gradient-to-br from-blue-500 to-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${robotoSlab.className} text-3xl font-bold mb-6`}>Transform your recruitment strategy with <span className={robotoSlab.className}>finnnest.</span></h2>
          <Link href="/learn-more" className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-6 rounded-full text-lg transition duration-300">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

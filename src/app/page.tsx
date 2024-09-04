import Link from "next/link";
import { Roboto } from 'next/font/google';
import { LogInButton } from "@/components/AuthForm";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});


export default function Home() {
  return (
    <div className={roboto.className}>
      {/* Hero Section */}
      <section className="bg-blue-50 py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hire Smarter, Faster, and More Accurately</h1>
          <p className="text-gray-600 mb-8">
            Custom Skill Tests and Resume Access for Effortless Candidate Screening
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/learn-more" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300">
              I am recruiting
            </Link>
            <Link href="/job-board" className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-300">
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

      {/* Sales Funnel Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Choose Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-500 hover:border-2 flex flex-col h-full">
              <div className="px-6 py-8 flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Basic</h3>
                <p className="text-4xl font-bold text-gray-800 mb-4">$49<span className="text-gray-600 text-base font-normal">/mo</span></p>
                <ul className="text-sm text-gray-600 mb-6">
                  <li className="mb-2">Three Job Offers at a time</li>
                  <li className="mb-2">Dashboard reporting</li>
                  <li className="mb-2">Email support</li>
                  <li className="mb-2">Single user license</li>
                </ul>
              </div>
              <div className="px-6 pb-8">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Choose Plan</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-500 hover:border-2 flex flex-col h-full">
              <div className="px-6 py-8 flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Pro</h3>
                <p className="text-4xl font-bold text-gray-800 mb-4">$89<span className="text-gray-600 text-base font-normal">/mo</span></p>
                <ul className="text-sm text-gray-600 mb-6">
                  <li className="mb-2">Ten job offers at a time</li>
                  <li className="mb-2">Dashboard+ experience</li>
                  <li className="mb-2">Email support</li>
                  <li className="mb-2">3 recruiters profile</li>
                </ul>
              </div>
              <div className="px-6 pb-8">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Choose Plan</button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-500 hover:border-2 flex flex-col h-full">
              <div className="px-6 py-8 flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Enterprise</h3>
                <p className="text-4xl font-bold text-gray-800 mb-4">$139<span className="text-gray-600 text-base font-normal">/mo</span></p>
                <ul className="text-sm text-gray-600 mb-6">
                  <li className="mb-2">Unlimited job offers</li>
                  <li className="mb-2">Dashboard+ experience</li>
                  <li className="mb-2">Email support</li>
                  <li className="mb-2">10 recruiters profile</li>
                  <li className="mb-2">Premium visibility option</li>
                  <li className="mb-2">Custom integration tools</li>
                  <li className="mb-2">Priority support</li>
                </ul>
              </div>
              <div className="px-6 pb-8">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">Choose Plan</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Join Our Community</h2>
          <p className="text-gray-600 mb-8">
            Be a part of a growing community of professionals and employers. Connect, network, and grow together.
          </p>
          <LogInButton />
        </div>
      </section>
    </div>
  );
}

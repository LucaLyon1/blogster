import { FaCheck, FaStar, FaCrown } from 'react-icons/fa';
import { Suspense } from 'react';
import BuyButton from '@/components/BuyButton';

export default function UpgradePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpgradePageContent />
        </Suspense>
    );
}

function UpgradePageContent() {


    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-24 max-w-6xl w-full">
                <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">Choose Your Plan</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <div className="bg-white rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-transparent hover:bg-gradient-to-r from-blue-200 to-purple-200">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Free</h2>
                            <p className="text-3xl font-bold mb-6 text-gray-800">$0</p>
                            <ul className="mb-6 space-y-2">
                                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Apply to jobs</li>
                                <li className="flex items-center"><FaCheck className="text-green-500 mr-2" /> Create a profile</li>
                            </ul>
                        </div>
                        <button className="mt-4 w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors duration-300">
                            Current Plan
                        </button>
                    </div>

                    {/* Premium Plan */}
                    <div className="bg-white rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-transparent hover:bg-gradient-to-r from-yellow-200 to-orange-200">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Premium</h2>
                            <p className="text-3xl font-bold mb-6 text-gray-800">$49.9</p>
                            <ul className="mb-6 space-y-2">
                                <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Create limited job offers</li>
                                <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Create tests</li>
                                <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Access dashboard</li>
                                <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> View candidate results</li>
                                <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Access test libraries</li>
                                <li className="flex items-center"><FaStar className="text-yellow-500 mr-2" /> Client support</li>
                            </ul>
                        </div>

                        <BuyButton subscription="premium" />
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white rounded-xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-200 hover:border-transparent hover:bg-gradient-to-r from-purple-200 to-pink-200">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Enterprise</h2>
                            <p className="text-3xl font-bold mb-6 text-gray-800">$99.9</p>
                            <ul className="mb-6 space-y-2">
                                <li className="flex items-center"><FaCrown className="text-purple-500 mr-2" /> Create unlimited job offers</li>
                                <li className="flex items-center"><FaCrown className="text-purple-500 mr-2" /> Access test libraries</li>
                                <li className="flex items-center"><FaCrown className="text-purple-500 mr-2" /> Priority support</li>
                                <li className="flex items-center"><FaCrown className="text-purple-500 mr-2" /> Advanced dashboard</li>
                                <li className="flex items-center"><FaCrown className="text-purple-500 mr-2" /> Multidimensional analysis</li>
                            </ul>
                        </div>
                        <BuyButton subscription="enterprise" />
                    </div>
                </div>
            </div>
        </div>
    );
}

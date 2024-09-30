function FeaturesSection() {
    return (
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
    );
}

export default FeaturesSection;
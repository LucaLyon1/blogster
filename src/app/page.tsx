import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Finnnest</h1>
          <p className="text-gray-600 mb-8">
            Your premier skill-based recruitment platform. Find the best talent or your dream job with ease.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/signup" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300">
              Get Started
            </Link>
            <Link href="/learn-more" className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-300">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Sales Funnel Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Why Choose Finnnest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="/images/feature1.png" alt="Feature 1" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature 1</h3>
              <p className="text-gray-600">Description of the first feature that highlights its benefits and value.</p>
            </div>
            <div className="text-center">
              <img src="/images/feature2.png" alt="Feature 2" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature 2</h3>
              <p className="text-gray-600">Description of the second feature that highlights its benefits and value.</p>
            </div>
            <div className="text-center">
              <img src="/images/feature3.png" alt="Feature 3" className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Feature 3</h3>
              <p className="text-gray-600">Description of the third feature that highlights its benefits and value.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Join Our Community</h2>
          <p className="text-gray-600 mb-8">
            Be a part of a growing community of professionals and employers. Connect, network, and grow together.
          </p>
          <Link href="/signup" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition duration-300">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}

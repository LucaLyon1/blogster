import Link from "next/link";
import { Roboto, Roboto_Slab } from 'next/font/google';
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";

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
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />
      {/* Screenshots Section */}
      <ScreenshotsSection />

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

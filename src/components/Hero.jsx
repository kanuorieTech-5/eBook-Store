import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Hero() {
  return (
    <section className="bg-purple-700 text-white py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">

         {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-5xl"
        >

          {/* Brand */}
          <h1 className="text-4xl md:text-6xl font-black text-yellow-400 mb-4 tracking-tight">
            UketBooks
          </h1>

          {/* Headline */}
          <h2 className="text-4xl md:text-7xl font-black leading-tight text-white mb-6">
            Discover your next
            <span className="text-yellow-400"> favorite book</span>
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Read previews, explore categories, and instantly access
            premium digital books after secure payment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">

            <button className="bg-yellow-400 hover:bg-yellow-300 transition text-black px-10 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-yellow-400/20">
              Explore Books
            </button>

            <button className="border border-white/10 bg-white/5 hover:bg-white/10 transition text-white px-10 py-4 rounded-2xl font-semibold text-lg">
              Read Preview
            </button>

          </div>

          {/* Trust Badge */}
          <div className="mt-10 text-gray-800 text-sm mb-10">
            Trusted by readers worldwide • Secure payments • Instant downloads
          </div>

        </motion.div>

        <Link
          to="/books"
          className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
        >
         Get Started Here 
        </Link>
        <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" alt="Library" className="mx-auto mt-10 w-full max-w-md rounded-lg shadow" />
      </div>
    </section>
  );
}
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export default function Hero() {
  return (
    <section className="bg-purple-700 text-white py-2 mb-2">
      <div className="max-w-6xl mx-auto px-6 text-center md:px-12">

         {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-5xl"
        >
          {/* Brand */}
          <div
            className="relative overflow-hidden rounded-3xl py-32 px-6 md:px-12 text-center bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')",
            }}
           >
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Content */}
            <div className="relative z-10">
              
              {/* Brand */}
              <h1 className="text-5xl md:text-6xl font-black text-yellow-400 mb-4 tracking-tight">
                UketBooks
              </h1>
              <h2 className="text-2xl md:text-2xl text-gray-200 mb-6">
                Your favorite Ebooks store
              </h2>
              {/* Headline */}
              <h3 className="text-4xl md:text-7xl font-black leading-tight text-white mb-6">
                Discover your next
                <span className="text-yellow-400"> favorite book</span>
              </h3>

              {/* Description */}
              <p className="text-gray-100 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed">
                
              </p>

            </div>
          </div>
          {/* Subtext */}
          <p className="text-gray-400 text-lg md:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed mt-6">
            Read previews, explore categories, and instantly access
            premium digital books after secure payment.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">

            <Link
              to="/books"
              className="bg-yellow-400 hover:bg-yellow-300 transition text-black px-10 py-4 rounded-2xl font-bold text-lg shadow-lg shadow-yellow-400/20"
            >
              Explore Books
            </Link>

            <Link
              to="/previewmodal"
              className="border border-white/10 bg-white/5 hover:bg-white/10 transition text-white px-10 py-4 rounded-2xl font-semibold text-lg"
            >
              Read Preview
            </Link>

          </div>

          {/* Trust Badge */}
          <div className="mt-10 text-gray-800 text-sm mb-10">
            Trusted by readers worldwide • Secure payments • Instant downloads
          </div>

        </motion.div>

        <Link
          to="/books"
          className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Download Books 
        </Link>
      </div>
    </section>
  );
}
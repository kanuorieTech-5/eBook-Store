import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeatureCarousel from "../components/FeatureCarousel";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-purple-900 text-black dark:bg-black dark:text-white relative overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-purple-900/20 to-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">

        {/* HERO */}
        <section className="pb-16">
          <Hero />
        </section>

        {/* TRUST STRIP (NEW SaaS FEEL) */}
        <section className="text-center text-gray-500 text-sm mb-10 px-6">
          Join over 50,000 readers who have found their next great read with UketBooks.
        </section>

        {/* CATEGORIES */}
        <section className="max-w-6xl mx-auto px-6 mb-20">
          <div className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-6 md:p-10
            shadow-lg
          ">
            <Categories />
          </div>
        </section>

        {/* FEATURED SECTION */}
        <section className="max-w-6xl mx-auto px-6 mb-24">

          {/* Apple-style container */}
          <div className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-3xl
            p-6
          ">
            <FeatureCarousel />
          </div>

        </section>

        {/* FINAL CTA SECTION (SAAS STYLE) */}
        <section className="max-w-6xl mx-auto px-6 mb-28">

          <div className="
            text-center
            bg-gradient-to-r from-purple-900/20 via-white/5 to-purple-900/20
            border border-white/10
            rounded-3xl
            p-12 md:p-16
            backdrop-blur-xl
          ">

            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Start reading smarter today
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Join thousands of readers accessing premium ebooks instantly with a seamless experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <a
                href="/books"
                className="
                  bg-purple-600 hover:bg-purple-500
                  px-8 py-4 rounded-2xl font-bold
                  transition-all duration-300
                  hover:scale-[1.02]
                "
              >
                Explore Library
              </a>

              <a
                href="/register"
                className="
                  bg-white/5 border border-white/10
                  px-8 py-4 rounded-2xl font-semibold
                  hover:bg-white/10 transition
                "
              >
                Create Account
              </a>

            </div>

          </div>

        </section>

        {/* TESTIMONIALS */}
        <section className="max-w-6xl mx-auto px-6 mb-28">
          <Testimonials />
        </section>

      </div>
    </div>
  );
}
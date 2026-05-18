import { useNavigate } from "react-router-dom";

import {
  FaLock,
  FaArrowRight,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function Register() {

  const navigate =
    useNavigate();

  return (
    <main
      className="
        min-h-screen
        bg-white
        dark:bg-black
        transition-colors
        duration-300
        flex
        items-center
        justify-center
        px-6
        py-20
        relative
        overflow-hidden
      "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[500px]
          h-[500px]
          bg-yellow-400/10
          blur-[120px]
          rounded-full
        "
      />

      {/* CARD */}
      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.7,
        }}

        className="
          relative
          z-10
          w-full
          max-w-lg
          bg-white/70
          dark:bg-white/[0.04]
          backdrop-blur-2xl
          border border-black/5
          dark:border-white/10
          rounded-[36px]
          p-10
          shadow-2xl
          text-center
        "
      >

        {/* ICON */}
        <div
          className="
            w-24
            h-24
            rounded-full
            bg-yellow-400
            text-black
            flex
            items-center
            justify-center
            text-4xl
            mx-auto
            mb-8
            shadow-lg
            shadow-yellow-400/20
          "
        >
          <FaLock />
        </div>

        {/* TITLE */}
        <h1
          className="
            text-4xl
            md:text-5xl
            font-black
            text-black
            dark:text-white
            mb-5
          "
        >
          Registration
          <span className="text-yellow-400">
            {" "}Closed
          </span>
        </h1>

        {/* TEXT */}
        <p
          className="
            text-gray-600
            dark:text-gray-400
            text-lg
            leading-relaxed
            mb-10
          "
        >
          Account creation is currently unavailable.
          Please check back later for new member
          access and exclusive digital content.
        </p>

        {/* BUTTON */}
        <button
          onClick={() =>
            navigate("/")
          }

          className="
            group
            w-full
            bg-yellow-400
            hover:bg-yellow-300
            text-black
            py-4
            rounded-2xl
            font-bold
            text-lg
            transition-all
            duration-300
            flex
            items-center
            justify-center
            gap-3
            shadow-lg
            shadow-yellow-400/20
          "
        >

          Return Home

          <FaArrowRight
            className="
              group-hover:translate-x-1
              transition-transform
            "
          />

        </button>

      </motion.div>

    </main>
  );
}
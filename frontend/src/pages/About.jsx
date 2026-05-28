export default function About() {
  return (
    <main
      className="
        min-h-screen
        px-6
        py-20
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
        "
      >
        <h1
          className="
            text-5xl
            font-black
            mb-6
          "
        >
          About Us
        </h1>

        <p
          className="
            text-lg
            text-gray-400
            leading-relaxed
          "
        >
          eBook Store is a modern
          digital learning platform
          built for readers,
          developers, students and
          professionals who want
          instant access to premium
          ebooks anywhere anytime.
        </p>

        <div
          className="
            grid
            md:grid-cols-3
            gap-6
            mt-14
          "
        >
          <div
            className="
              bg-white/5
              p-6
              rounded-3xl
              border
              border-white/10
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-3
              "
            >
              📚 Digital Library
            </h2>

            <p className="text-gray-400">
              Access thousands of
              digital ebooks.
            </p>
          </div>

          <div
            className="
              bg-white/5
              p-6
              rounded-3xl
              border
              border-white/10
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-3
              "
            >
              ⚡ Instant Access
            </h2>

            <p className="text-gray-400">
              Buy and download books
              instantly after payment.
            </p>
          </div>

          <div
            className="
              bg-white/5
              p-6
              rounded-3xl
              border
              border-white/10
            "
          >
            <h2
              className="
                text-2xl
                font-bold
                mb-3
              "
            >
              🌍 Learn Anywhere
            </h2>

            <p className="text-gray-400">
              Read from any device
              anytime.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
export default function Help() {
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
          max-w-4xl
          mx-auto
        "
      >
        <h1
          className="
            text-5xl
            font-black
            mb-8
          "
        >
          Help Center
        </h1>

        <div
          className="
            space-y-6
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
                mb-2
              "
            >
              How do I download books?
            </h2>

            <p className="text-gray-400">
              Purchased ebooks are
              automatically added to
              your library.
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
                mb-2
              "
            >
              Payment issues?
            </h2>

            <p className="text-gray-400">
              Contact support for
              failed or pending
              transactions.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
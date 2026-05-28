export default function Contact() {
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
          max-w-3xl
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
          Contact Us
        </h1>

        <p
          className="
            text-gray-400
            mb-10
          "
        >
          We'd love to hear from you.
        </p>

        <form
          className="
            space-y-5
          "
        >
          <input
            type="text"
            placeholder="Your name"
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
            "
          />

          <input
            type="email"
            placeholder="Email address"
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
            "
          />

          <textarea
            rows="6"
            placeholder="Message"
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
            "
          />

          <button
            className="
              bg-yellow-400
              hover:bg-yellow-300
              text-black
              font-bold
              px-8
              py-4
              rounded-2xl
            "
          >
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}
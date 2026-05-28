export default function Feedback() {
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
          Feedback
        </h1>

        <textarea
          rows="8"
          placeholder="Share your feedback..."
          className="
            w-full
            p-5
            rounded-3xl
            bg-white/5
            border
            border-white/10
          "
        />

        <button
          className="
            mt-5
            bg-purple-600
            hover:bg-purple-500
            px-8
            py-4
            rounded-2xl
            font-bold
          "
        >
          Submit Feedback
        </button>
      </div>
    </main>
  );
}
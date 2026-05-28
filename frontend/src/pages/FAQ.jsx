const faqs = [
  {
    q: "How do I buy books?",
    a: "Add books to cart and proceed to checkout.",
  },

  {
    q: "Do I receive physical books?",
    a: "No. All books are digital downloads.",
  },

  {
    q: "Can I read on mobile?",
    a: "Yes. Books are accessible on all devices.",
  },
];

export default function FAQ() {
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
            mb-10
          "
        >
          Frequently Asked Questions
        </h1>

        <div
          className="
            space-y-5
          "
        >
          {faqs.map(
            (faq, index) => (
              <div
                key={index}
                className="
                  p-6
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                "
              >
                <h2
                  className="
                    text-xl
                    font-bold
                    mb-2
                  "
                >
                  {faq.q}
                </h2>

                <p className="text-gray-400">
                  {faq.a}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </main>
  );
}
export default function CategoryFilter({ category, setCategory }) {
  const categories = [
    "All",
    "Fiction",
    "Business",
    "Technology",
    "Science",
    "Self Development",
    "History",
  ];

  return (
    <section className="px-6 md:px-12 py-8 bg-gray-900 rounded-2xl mb-10">

      <div className="max-w-6xl mx-auto px-6 md:px-12">

        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Browse Categories
        </h2>

        {/* Mobile Scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:hidden">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition
                ${
                  category === cat
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-800"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 mt-4">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setCategory(cat)}
              className={`p-6 text-center rounded-lg font-semibold cursor-pointer transition
                ${
                  category === cat
                    ? "bg-purple-600 text-white"
                    : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                }`}
            >
              {cat}
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
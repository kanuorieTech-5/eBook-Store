import {
  FaBriefcase,
  FaChartLine,
  FaLaptopCode,
  FaHeart,
  FaBookOpen,
  FaCode,
} from "react-icons/fa";

const categories = [
  {
    name: "Business",
    icon: FaBriefcase,
  },
  {
    name: "Finance",
    icon: FaChartLine,
  },
  {
    name: "Technology",
    icon: FaLaptopCode,
  },
  {
    name: "Self Help",
    icon: FaBookOpen,
  },
  {
    name: "Romance",
    icon: FaHeart,
  },
  {
    name: "Programming",
    icon: FaCode,
  },
];

export default function CategoryFilter({
  category,
  setCategory,
}) {

  return (
    <section className="px-4 md:px-8 py-14 bg-black border-t border-white/10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">

        <div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3">
            Browse Categories
          </h2>

          <p className="text-gray-400 max-w-2xl text-sm md:text-lg">
            Explore ebooks across business, tech,
            finance, self-development, and more.
          </p>
        </div>

        <button
          onClick={() => setCategory("All")}
          className="text-yellow-400 hover:text-yellow-300 transition font-semibold text-left md:text-right"
        >
          View All
        </button>

      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

        {categories.map((item) => {

          const Icon = item.icon;

          const active = category === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setCategory(item.name)}
              className={`group rounded-3xl p-5 flex flex-col items-center justify-center gap-3 transition-all duration-300 border

                ${
                  active
                    ? "bg-yellow-400 border-yellow-400"
                    : "bg-gray-900 border-white/10 hover:border-yellow-400/40 hover:bg-yellow-400"
                }
              `}
            >

              {/* Icon */}
              <div
                className={`text-3xl transition
                  ${
                    active
                      ? "text-black"
                      : "text-yellow-400 group-hover:text-black"
                  }
                `}
              >
                <Icon />
              </div>

              {/* Name */}
              <span
                className={`font-bold text-sm md:text-base text-center transition
                  ${
                    active
                      ? "text-black"
                      : "text-white group-hover:text-black"
                  }
                `}
              >
                {item.name}
              </span>

            </button>
          );
        })}

      </div>

    </section>
  );
}

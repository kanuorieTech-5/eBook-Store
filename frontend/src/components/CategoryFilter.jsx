import {
  FaBook,
  FaBriefcase,
  FaLaptopCode,
  FaFlask,
  FaBrain,
  FaLandmark,
} from "react-icons/fa";

export default function CategoryFilter({
  category,
  setCategory,
}) {

  const categories = [
    {
      name: "All",
      icon: <FaBook />,
    },
    {
      name: "Fiction",
      icon: <FaBook />,
    },
    {
      name: "Business",
      icon: <FaBriefcase />,
    },
    {
      name: "Technology",
      icon: <FaLaptopCode />,
    },
    {
      name: "Science",
      icon: <FaFlask />,
    },
    {
      name: "Self Development",
      icon: <FaBrain />,
    },
    {
      name: "History",
      icon: <FaLandmark />,
    },
  ];

  return (
    <section className="mb-10">

      <div className="bg-gray-900 rounded-3xl p-6 md:p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Browse Categories
          </h2>

          <span className="text-sm text-gray-400 hidden md:block">
            Select a category
          </span>

        </div>

        {/* Mobile Scroll */}
        <div className="flex md:hidden gap-3 overflow-x-auto scrollbar-hide pb-2">

          {categories.map((cat) => (

            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`flex items-center gap-2 whitespace-nowrap px-5 py-3 rounded-2xl transition-all duration-300 text-sm font-medium
              
              ${
                category === cat.name
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >

              <span>{cat.icon}</span>

              {cat.name}

            </button>
          ))}

        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">

          {categories.map((cat) => (

            <button
              key={cat.name}
              onClick={() => setCategory(cat.name)}
              className={`group p-5 rounded-2xl transition-all duration-300 flex items-center gap-4 text-left
              
              ${
                category === cat.name
                  ? "bg-purple-600 text-white shadow-xl scale-105"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >

              {/* Icon */}
              <div className={`text-2xl
              
              ${
                category === cat.name
                  ? "text-white"
                  : "text-yellow-400"
              }`}>

                {cat.icon}

              </div>

              {/* Text */}
              <div>

                <h3 className="font-semibold">
                  {cat.name}
                </h3>

                <p className="text-xs opacity-70 mt-1">
                  Explore books
                </p>

              </div>

            </button>
          ))}

        </div>

      </div>

    </section>
  );
}
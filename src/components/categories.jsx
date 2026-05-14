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
    icon: <FaBriefcase />,
  },
  {
    name: "Finance",
    icon: <FaChartLine />,
  },
  {
    name: "Technology",
    icon: <FaLaptopCode />,
  },
  {
    name: "Self Help",
    icon: <FaBookOpen />,
  },
  {
    name: "Romance",
    icon: <FaHeart />,
  },
  {
    name: "Programming",
    icon: <FaCode />,
  },
];

export default function Categories() {
  return (
    <section className="px-6 md:px-12 py-20 bg-gray-950">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
        
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3">
            Browse Categories
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl">
            Explore ebooks from multiple industries,
            knowledge areas, and creative fields.
          </p>
        </div>

        <button className="text-yellow-400 hover:text-yellow-300 transition font-semibold">
          View All Categories
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        
        {categories.map((category, index) => (
          <button
            key={index}
            className="group bg-gray-900 border border-white/10 hover:border-yellow-400/40 hover:bg-yellow-400 transition-all duration-300 rounded-3xl p-6 flex flex-col items-center justify-center gap-4"
          >
            
            {/* Icon */}
            <div className="text-4xl text-yellow-400 group-hover:text-black transition">
              {category.icon}
            </div>

            {/* Name */}
            <span className="text-white group-hover:text-black font-bold text-lg transition text-center">
              {category.name}
            </span>

          </button>
        ))}
      </div>
    </section>
  );
}
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {

  // State
  const [search, setSearch] = useState("");

  return (
    <div className="px-10 py-2 md:px-12">
      
      <div className="max-w-3xl mx-auto relative">

        {/* Search Icon */}
        <FiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 text-2xl" />

        {/* Input */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-100 border border-white/10 rounded-2xl px-4 py-1 text-white outline-none focus:border-yellow-400 transition"
        />

      </div>
    </div>
  );
}
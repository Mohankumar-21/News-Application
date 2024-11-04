import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onSearch(e.target.value);
  };

  return (
    <div className="relative md:w-2/4 left-0 mx-auto mt-2">
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search news by keywords..."
        className="w-full py-3 px-10 text-black bg-opacity-20 bg-white backdrop-blur-md rounded-lg shadow-md placeholder-white transition duration-300 border-none outline-none focus:ring-2 focus:ring-blue-500"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.2)", 
        }}
      />
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;

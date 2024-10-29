import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onSearch(e.target.value); 
  };

  return (
    <div className="relative w-3/4">
      <input 
        type="text"
        onChange={handleChange}
        placeholder="Search news by keywords..."
        className="border border-gray-300 rounded p-2 pr-10 w-full" 
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    </div>
  );
};

export default SearchBar;

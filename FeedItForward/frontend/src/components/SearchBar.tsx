import React, { useState } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";

interface SearchBarProps {
  searchItemPlaceholder: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const { searchItemPlaceholder } = props;
  const [searchKey, setSearchKey] = useState("");

  const handleSearch = () => {
    // TODO: connect search to backend
    console.log("Search for: ", searchKey);
  };

  return (
    <div className="flex flex-row items-center shadow-sm p-3 gap-3 rounded-full border-2 border-brand-darkgray">
      <FaSearch id="search-icon" className="ml-1 text-brand-darkgray" />
      <input
        className="outline-none w-full"
        placeholder={"Search " + searchItemPlaceholder}
        onChange={e => setSearchKey(e.target.value)}
      />
      <FaArrowRight
        className={`mr-1 ${
          searchKey.length > 3
            ? "text-black animate-pulse"
            : "text-brand-darkgray"
        }`}
        onClick={handleSearch}
      />
    </div>
  );
};

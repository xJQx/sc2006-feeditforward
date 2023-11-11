import React, { useState } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";

interface SearchBarProps {
  searchItemPlaceholder: string;
  handleSearch: (_searchKey: string) => void;
  handleOnClear?: () => void;
  className?: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const { searchItemPlaceholder, handleSearch, handleOnClear, className } =
    props;
  const [searchKey, setSearchKey] = useState("");

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value);

    if (e.target.value.length > 2) {
      handleSearch(e.target.value);
    } else {
      if (handleOnClear) handleOnClear();
    }
  };

  return (
    <div
      className={
        "flex flex-row items-center shadow-sm p-3 gap-3 rounded-full border-2 border-brand-darkgray " +
        className
      }
    >
      <FaSearch id="search-icon" className="ml-1 text-brand-darkgray" />
      <input
        className="outline-none w-full"
        placeholder={"Search " + searchItemPlaceholder}
        onChange={handleValueChange}
      />
      <FaArrowRight
        className={`mr-1 ${
          searchKey.length > 2
            ? "text-black animate-pulse"
            : "text-brand-darkgray"
        }`}
      />
    </div>
  );
};

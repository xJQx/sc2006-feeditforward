import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";

export const SearchBar = (props: {searchItem:string}) => {
    const [input, setInput] = useState("")
    return (
    <div className="flex flex-row items-center shadow-lg p-3 gap-3 rounded-full border-2 border-slate-300">
        <FaSearch id="search-icon" />
        <input 
            className="outline-none w-full"
            onChange={(e) => setInput(e.target.value)}
            placeholder={"Search " + props.searchItem}
        />
    </div>
    );
};
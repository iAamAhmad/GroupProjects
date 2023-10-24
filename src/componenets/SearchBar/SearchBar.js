import React, { useState, useCallback } from "react";

const SearchBar = (props) => {
  
  const { onSearch } = props;
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
    
  }, []);

  const search = useCallback(() => {
    onSearch(term);
  }, [onSearch, term]);

  return (
    <div className="flex flex-col items-center pt-4 mb-6 ">
      <input placeholder="Enter A Song Title"
        className="w-72 py-2 px-0 border border-gray-800 rounded-md mb-2 text-blue-900 text-center text-1 focus:outline-none"
        onChange={handleTermChange} />
      <button className="cursor-pointer py-2 px-6 rounded-full bg-indigo-950 text-center text-1 transition duration-250 border-0 text-white hover:bg-opacity-70"
        onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;

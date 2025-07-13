import React, { useState } from "react";
import { search } from "../../api/api";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Search() {
  const [searchData, setSearchData] = useState("");

  const handleChange = async (e) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchResult = await search(searchData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full max-w-2xl mx-auto"
    >
      <input
        type="text"
        placeholder="Searching for Jesus..."
        value={searchData}
        onChange={handleChange}
        className="w-full p-3 border rounded-md focus:outline-indigo-600"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-white-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        <HugeiconsIcon icon={Search01Icon} className="text-black hover:text-white transition-colors duration-200"/>
      </button>

      <div>
        
      </div>
    </form>
  );
}

export default Search;

import React, {useState} from "react";
import { search } from "../../api/api"; 

function Search(){
    const [searchData, setSearchData] = useState("");

    const handleChange = async (e) => {
        setSearchData(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchResult = await search(searchData)
    }

    return (
        <div className="flex items-center gap-2 w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Searching for Jesus..."
          value={searchData}
          onChange={handleChange}
          className="w-full p-3 border rounded-md focus:outline-indigo-600"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-white-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
            <img
            src="/search_icon.png" 
            className="w-6 h-6 object-contain hover:opacity-75"
            />
        </button>
      </div>
    )
};

export default Search
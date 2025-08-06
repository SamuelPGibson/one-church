import React from "react";

function SearchBar({ value, setValue }) {
  return (
    <div className="flex items-center w-full max-w-md mx-auto py-2">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search..."
        className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {/* <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 text-white rounded-r hover:bg-indigo-700 focus:outline-none"
        tabIndex={-1}
        disabled
      >
        🔍
      </button> */}
    </div>
  );
}

export default SearchBar;

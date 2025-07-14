import React, { useState } from "react";
import { search } from "../../api/api";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

function Filter({ selectedOptions, setSelectedOptions, userId }) {
  const dropdownOptions = ["Users", "Organizations", "Posts", "Events"];
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleDropdownOptions = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Select Filter Options
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border rounded shadow">
          {dropdownOptions.map((option) => (
            <label
              key={option}
              className="flex items-center px-3 py-2 hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleDropdownOptions(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function Search({ userId }) {
  const [searchData, setSearchData] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([
    "Users",
    "Organizations",
    "Posts",
    "Events",
  ]);
  const handleChange = async (e) => {
    setSearchData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchResult = await search(
      searchData,
      selectedOptions.includes("Posts"),
      selectedOptions.includes("Events"),
      selectedOptions.includes("Organizations"),
      selectedOptions.includes("Users")
    );
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
        <HugeiconsIcon
          icon={Search01Icon}
          className="text-black hover:text-white transition-colors duration-200"
        />
      </button>

      <Filter
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        userId={userId}
      />
    </form>
  );
}

export default Search;

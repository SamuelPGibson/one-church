import React from "react";

function FilterBar({ users, setUsers, organizations, setOrganizations, events, setEvents, posts, setPosts }) {
  const BUTTONS = [
    { label: "All", key: "all", icon: "🔍" },
    { label: "Users", key: "users", icon: "👥" },
    { label: "Organizations", key: "organizations", icon: "🏢" },
    { label: "Events", key: "events", icon: "📅" },
    { label: "Posts", key: "posts", icon: "📝" },
  ];

  const handleButtonClick = (key) => {
    if (key === "all") {
      setUsers(true);
      setOrganizations(true);
      setEvents(true);
      setPosts(true);
    } else {
      setUsers(key === "users");
      setOrganizations(key === "organizations");
      setEvents(key === "events");
      setPosts(key === "posts");
    }
  };

  const getSelectedButton = () => {
    if (users && organizations && events && posts) {
      return "all";
    } else if (users && !organizations && !events && !posts) {
      return "users";
    } else if (!users && organizations && !events && !posts) {
      return "organizations";
    } else if (!users && !organizations && events && !posts) {
      return "events";
    } else if (!users && !organizations && !events && posts) {
      return "posts";
    } else {
      return null; // Custom selection
    }
  };

  const selected = getSelectedButton();

  return (
    <div className="flex space-x-2 mb-2">
      {BUTTONS.map((btn) => (
        <button
          key={btn.key}
          className={`px-4 py-2 rounded ${
            selected === btn.key
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          } focus:outline-none`}
          onClick={() => handleButtonClick(btn.key)}
        >
          <span className="mr-1">{btn.icon}</span>
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;

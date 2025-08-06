import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";
import { search } from "../../api/api";
import ResultsList from "./resultsList";

function ExplorePage({ userId, user }) {
  const [users, setUsers] = useState(true);
  const [organizations, setOrganizations] = useState(true);
  const [events, setEvents] = useState(true);
  const [posts, setPosts] = useState(true);
  const [queryData, setqueryData] = useState("");

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (queryData === "") {
        setResults([]);
        return;
      }
      const results = await search(userId, queryData, posts, events, organizations, users);
      setResults(results.data);
    };
    fetchResults();
  }, [queryData, users, organizations, events, posts]);

  return (
    <div className="flex flex-col items-center justify-center">
      <SearchBar value={queryData} setValue={setqueryData} />
      <FilterBar
        users={users}
        setUsers={setUsers}
        organizations={organizations}
        setOrganizations={setOrganizations}
        events={events}
        setEvents={setEvents}
        posts={posts}
        setPosts={setPosts} />
      <ResultsList userId={userId} user={user} results={results} />
    </div>
  );
}

export default ExplorePage;

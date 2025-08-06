import React from "react";
import { User, Organization } from "./resultItems";
import Post from "../feed_page/Post";
import Event from "../feed_page/Event";

const ResultsList = ({ userId, user, results }) => {
  if (!results || results.length === 0) {
    return <div className="text-gray-500 p-4">No results found.</div>;
  }

  return (
    <div className="results-list space-y-2">
      <div className="font-semibold text-lg text-gray-700 mb-2">Search Results</div>
      {results.map((item, idx) => {
        switch (item.type) {
          case "user":
            return <User key={idx} user={item} />;
          case "organization":
            return <Organization key={idx} organization={item} />;
          case "event":
            return <Event key={idx} userId={userId} user={user} event={item} hideContent={true} />;
          case "post":
            return <Post key={idx} userId={userId} user={user} post={item} hideContent={true} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ResultsList;

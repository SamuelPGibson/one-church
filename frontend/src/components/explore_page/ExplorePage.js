import React from "react";
import Search from "./Search";

function ExplorePage({ userId }) {
  return (
    <div>
      <Search userId={userId} />
    </div>
  );
}

export default ExplorePage;

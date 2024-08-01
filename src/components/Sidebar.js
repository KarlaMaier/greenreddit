import React from "react";
import "./Sidebar.css"; // Optional: for styling

function Sidebar({ onSelectFeed }) {
  return (
    <div className="sidebar">
      <button onClick={() => onSelectFeed("popular")}>Popular Feed</button>
      <button onClick={() => onSelectFeed("food_and_drinks")}>
        Food and Drinks Feed
      </button>
    </div>
  );
}

export default Sidebar;

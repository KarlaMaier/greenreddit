import React, { useState } from "react";
import RedditPosts from "./components/RedditPosts";
import FoodAndDrinksPosts from "./components/FoodAndDrinksPosts";
import Sidebar from "./components/Sidebar";

function App() {
  const [selectedFeed, setSelectedFeed] = useState("popular");

  const handleSelectFeed = (feed) => {
    setSelectedFeed(feed);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelectFeed={handleSelectFeed} />
      <div style={{ flex: 1, padding: "20px" }}>
        {selectedFeed === "popular" ? (
          <RedditPosts subreddit="popular" />
        ) : (
          <FoodAndDrinksPosts />
        )}
      </div>
    </div>
  );
}

export default App;

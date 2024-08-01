// src/App.js
import React, { useState } from "react";
import Header from "./components/Header";
import RedditPosts from "./components/RedditPosts";
import FoodAndDrinksPosts from "./components/FoodAndDrinksPosts";
import SportsPosts from "./components/SportsPosts";
import "./components/Sidebar.css"; // Import the sidebar styles
import "./index.css"; // Import the general styles

function App() {
  const [selectedSubreddit, setSelectedSubreddit] = useState("popular");

  const renderContent = () => {
    switch (selectedSubreddit) {
      case "popular":
        return <RedditPosts subreddit="popular" />;
      case "food":
        return <FoodAndDrinksPosts />;
      case "sports":
        return <SportsPosts />;
      default:
        return <RedditPosts subreddit="popular" />;
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="content">{renderContent()}</main>
      <aside className="sidebar">
        <button onClick={() => setSelectedSubreddit("popular")}>Popular</button>
        <button onClick={() => setSelectedSubreddit("food")}>
          Food & Drinks
        </button>
        <button onClick={() => setSelectedSubreddit("sports")}>Sports</button>
      </aside>
    </div>
  );
}

export default App;

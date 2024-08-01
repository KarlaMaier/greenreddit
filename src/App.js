import React, { useState } from "react";
import Header from "./components/Header";
import RedditPosts from "./components/RedditPosts";
import FoodAndDrinksPosts from "./components/FoodAndDrinksPosts";
import SportsPosts from "./components/SportsPosts";
import MemesPosts from "./components/MemesPosts";
import PuppyPosts from "./components/PuppyPosts";
import "./components/Sidebar.css"; // Import the sidebar styles
import "./index.css"; // Import the general styles

function App() {
  const [selectedSubreddit, setSelectedSubreddit] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const renderContent = () => {
    switch (selectedSubreddit) {
      case "popular":
        return <RedditPosts subreddit="popular" searchQuery={searchQuery} />;
      case "food":
        return <FoodAndDrinksPosts searchQuery={searchQuery} />;
      case "sports":
        return <SportsPosts searchQuery={searchQuery} />;
      case "memes":
        return <MemesPosts searchQuery={searchQuery} />;
      case "puppy":
        return <PuppyPosts searchQuery={searchQuery} />;
      default:
        return <RedditPosts subreddit="popular" searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main className="content">{renderContent()}</main>
      <aside className="sidebar">
        <button onClick={() => setSelectedSubreddit("popular")}>Popular</button>
        <button onClick={() => setSelectedSubreddit("food")}>
          Food & Drinks
        </button>
        <button onClick={() => setSelectedSubreddit("sports")}>Sports</button>
        <button onClick={() => setSelectedSubreddit("memes")}>Memes</button>
        <button onClick={() => setSelectedSubreddit("puppy")}>Puppy</button>
      </aside>
    </div>
  );
}

export default App;

import React, { useEffect, useState, useCallback } from "react";
import "./FoodAndDrinksPosts.css";

function FoodAndDrinksPosts({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});
  const [visibleComments, setVisibleComments] = useState({});

  // Fetch data function with caching
  const fetchData = useCallback(
    async (query) => {
      const cacheKey = `food-${query.toLowerCase()}`;
      if (cache[cacheKey]) {
        setPosts(cache[cacheKey]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://www.reddit.com/r/food/.json");
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        const filteredPosts = data.data.children.filter((post) =>
          post.data.title.toLowerCase().includes(query.toLowerCase())
        );

        setPosts(filteredPosts);
        setCache((prevCache) => ({ ...prevCache, [cacheKey]: filteredPosts }));
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      }
    },
    [cache]
  );

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchData(searchQuery);
    }, 500); // Debounce delay

    return () => clearTimeout(handler);
  }, [searchQuery, fetchData]);

  const toggleComments = (id) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error)
    return <p className="error">Error loading posts: {error.message}</p>;

  if (posts.length === 0)
    return <p className="no-posts">No posts found for "{searchQuery}".</p>;

  return (
    <div className="posts-container">
      <h1>Food and Drinks Posts</h1>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.data.id} className="post-item">
            <h3 className="post-title">
              <a
                href={`https://www.reddit.com${post.data.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.data.title}
              </a>
            </h3>
            {post.data.url && (
              <div className="post-image">
                <img
                  src={post.data.url}
                  alt={post.data.title}
                  className="image"
                />
              </div>
            )}
            <div className="post-icons">
              <span
                className="icon"
                onClick={() => toggleComments(post.data.id)}
                title="Comments"
              >
                🗨️ {post.data.num_comments}
              </span>
              <span className="icon" title="Likes">
                👍 {post.data.ups}
              </span>
            </div>
            {visibleComments[post.data.id] && (
              <div className="comments">
                <p>
                  Comments are currently unavailable due to Reddit API
                  limitations.
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodAndDrinksPosts;

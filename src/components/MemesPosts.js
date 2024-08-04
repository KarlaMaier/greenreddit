import React, { useEffect, useState, useCallback } from "react";
import "./MemesPosts.css";

function MemesPosts({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({});

  // Fetch data function with caching
  const fetchData = useCallback(
    async (query) => {
      const cacheKey = `memes-${query.toLowerCase()}`;
      if (cache[cacheKey]) {
        setPosts(cache[cacheKey]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("https://www.reddit.com/r/memes.json");
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

  if (loading) return <p className="loading">Loading...</p>;
  if (error)
    return <p className="error">Error loading posts: {error.message}</p>;

  if (posts.length === 0)
    return <p className="no-posts">No posts found for "{searchQuery}".</p>;

  return (
    <div className="posts-container">
      <h1>Memes Posts</h1>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemesPosts;

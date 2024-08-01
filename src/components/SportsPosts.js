import React, { useEffect, useState } from "react";
import "./SportsPosts.css";

function SportsPosts({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleComments, setVisibleComments] = useState({});

  useEffect(() => {
    fetch("https://www.reddit.com/r/sports/.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.data.children);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error)
    return <p className="error">Error loading posts: {error.message}</p>;

  const filteredPosts = posts.filter((post) =>
    post.data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredPosts.length === 0)
    return <p>No posts found for "{searchQuery}".</p>;

  const toggleComments = (id) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="posts-container">
      <h1>Sports Posts</h1>
      <ul className="posts-list">
        {filteredPosts.map((post) => (
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
              <span className="icon" title="Shares">
                🔗 {post.data.num_crossposts}
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

export default SportsPosts;

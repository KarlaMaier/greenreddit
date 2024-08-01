// src/components/RedditPosts.js
import React, { useEffect, useState } from "react";

const RedditPosts = ({ subreddit, searchQuery }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Temporarily set all posts to see if data is fetched
        setPosts(data.data.children);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError(error);
        setLoading(false);
      });
  }, [subreddit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  // If no posts, return early
  if (posts.length === 0) return <p>No posts available.</p>;

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredPosts.length === 0)
    return <p>No posts found for "{searchQuery}".</p>;

  return (
    <div>
      <ul>
        {filteredPosts.map((post) => {
          const postData = post.data;
          const isImage =
            postData.url &&
            (postData.url.endsWith(".jpg") || postData.url.endsWith(".png"));
          const isRedditPost = postData.url.startsWith(
            "https://www.reddit.com/r/"
          );

          return (
            <li key={postData.id}>
              <h2>
                <a
                  href={`https://www.reddit.com${postData.permalink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {postData.title}
                </a>
              </h2>

              {isImage && (
                <div>
                  <img
                    src={postData.url}
                    alt={postData.title}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              )}

              {isRedditPost && (
                <div>
                  <iframe
                    src={postData.url}
                    title={postData.title}
                    style={{ width: "100%", height: "500px", border: "none" }}
                    allow="fullscreen"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RedditPosts;

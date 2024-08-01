import React, { useEffect, useState } from "react";

function PuppyPosts({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://www.reddit.com/r/puppy.json")
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  // Filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.data.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredPosts.length === 0)
    return <p>No posts found for "{searchQuery}".</p>;

  return (
    <div>
      <h1>Puppy Posts</h1>
      <ul>
        {filteredPosts.map((post) => {
          const postData = post.data;
          const isImage =
            postData.url &&
            (postData.url.endsWith(".jpg") || postData.url.endsWith(".png"));

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
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PuppyPosts;

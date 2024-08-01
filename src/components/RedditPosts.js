import React, { useEffect, useState } from "react";

function RedditPosts({ subreddit }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.data.children);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [subreddit]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts: {error.message}</p>;

  return (
    <div>
      <h1>Posts from r/{subreddit}</h1>
      <ul>
        {posts.map((post) => {
          const postData = post.data;
          const hasImage =
            postData.url &&
            (postData.url.endsWith(".jpg") || postData.url.endsWith(".png"));
          return (
            <li key={postData.id}>
              <a
                href={`https://www.reddit.com${postData.permalink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {postData.title}
              </a>
              {hasImage && (
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

export default RedditPosts;

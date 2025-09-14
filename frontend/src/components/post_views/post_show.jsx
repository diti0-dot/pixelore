import { useEffect, useState } from "react";
import axios from "axios";

export default function Show({ user, setUser }) {
  const [userPosts, setUserPosts] = useState([]);

  // fetch posts for current user
  const fetchUserPosts = () => {
    axios.get("http://localhost:3000/users/current/posts.json", { withCredentials: true })
      .then(response => setUserPosts(response.data))
      .catch(err => console.error("Failed to fetch user posts:", err));
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

    return (
    <>
      <div className="user_info">
        <h2>User:{user?.username}</h2>
        <p>Total Posts: {userPosts.length}</p>
      </div>

      <div className="container">
        {userPosts.map((post) => (
          <div className="card" key={post.id}>
            <div className="title">{post.title}</div>
            <div className="body">{post.body}</div>

          {post.post_pic_url ? (
          <div className="post_pic">
            <img src={post.post_pic_url} alt="Post visual" />
          </div>
        ) : (
          <div className="post_pic">
            <p>No image posted</p>
          </div>
        )}

            <div className="user_post_info">
              <p>
                Created by {post.user?.username || "Unknown"} on {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

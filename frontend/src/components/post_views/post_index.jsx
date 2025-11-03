import { useState } from "react";
import axios from "axios";

export default function PostIndex({ posts, setPosts }) {
  const [comments, setComments] = useState({})
  if (!posts) return <div>Loading...</div>;
  if (posts.length === 0) return <div>No posts found.</div>;


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  
  async function addComment(postId) {
  const commentText = comments[postId];
  if (!commentText) {
    alert("Please write a comment");
    return;
  }

  try {
  const newComment =  await axios.post(
  `http://localhost:3000/posts/${postId}/comments.json`,
  { comment: { body: commentText } },
  { withCredentials: true }
);
 const updatedPosts = posts.map(p =>
      p.id === postId ? { ...p, comments: [...p.comments, newComment.data] } : p
    );
    setPosts(updatedPosts);

    // clear input after posting
    setComments({ ...comments, [postId]: "" });
  } catch (err) {
    console.error(err);
  }
}


  return (
    <div className="container">
      {posts.map((post) => (
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
          <div className="comment">
              <h3>Comment(s): {post.comments.length}</h3>
             {post.comments.map((comment) => (
              <div className="cmt_card" key={comment.id}>
                <div>{comment.user.username}:</div>
              
              <div className="commnet_body">
                {comment.body}
              </div>
              </div>
             ))}
          </div>
          <div className="add_comments">
          <label htmlFor="comment"> Add comments
           <input id={`comment-${post.id}`} type="text"  value={comments[post.id] || ""}  onChange={(e) => setComments({...comments, [post.id]: e.target.value})}/>
           <button onClick={()=>addComment(post.id)}>Add</button>
          </label>
          </div>
        
          <div className="user_post_info">
            <p>
              Created by {post.user?.username || "Unknown user"} on {formatDate(post.created_at)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default function PostIndex({ posts }) {
  if (!posts) return <div>Loading...</div>;
  if (posts.length === 0) return <div>No posts found.</div>;


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
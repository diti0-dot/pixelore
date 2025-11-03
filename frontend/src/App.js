import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom"; 
import Header from "./components/header";
import Login from "./components/user_view/login";
import PostIndex from "./components/post_views/post_index"; 
import Draw from "./components/post_views/draw";
import Show from "./components/post_views/post_show"; 
import SignupPage from "./components/user_view/sign_up";
import "./App.css"; 

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userPosts, setuserPosts] = useState([]);

  
 const fetchPosts = () => {
  axios.get("http://localhost:3000/posts.json",{ withCredentials: true })
    .then(response => setPosts(response.data))
    .catch(err => console.error("Failed to fetch posts:", err));
};

const fetchuser = () =>{
      axios.get("http://localhost:3000/users/current.json", { withCredentials: true })
    .then(response => setUser(response.data))
    .catch(() => console.log("No user logged in"));
}

useEffect(() => {
  fetchuser();
  fetchPosts();
}, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };


  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
   

      <main>
        <Routes>
          <Route path="/" element={<PostIndex posts={posts} setPosts={setPosts} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/draw" element={<Draw user={user} setUser={setUser} setPosts={setPosts} fetchPosts={fetchPosts}/>}/>
          <Route path="/Show"  element={<Show user={user} setUser={setUser}/>} />
          <Route path="/SignupPage" element={<SignupPage fetchuser={fetchuser}/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
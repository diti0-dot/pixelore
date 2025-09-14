import { useEffect, useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom"; 

export default function Header({ user, setUser }) {
  const handleLogout = () => {
    axios
      .delete("http://localhost:3000/users/sign_out", {
        withCredentials: true,
      })
      .then(() => {
        setUser(null);
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  return (
    <header>
      <div className="head">
        <h1 className="app_name">PixelLore</h1>
        <div className="nav_bar">
          <Link to="/">Home</Link>
          <Link to="/Draw">Draw</Link>
          {user ? (
            <>
              
              <Link to="/Show">{user.username}</Link>
             <Link to="#" onClick={handleLogout} className="logout-link">
                Logout
              </Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
}
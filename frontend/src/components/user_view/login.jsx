import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/users/sign_in", { 
      user: { email, password } 
    }, { 
      withCredentials: true 
    })
    .then(response => {
      console.log("Logged in!", response.data);
      setEmail("");
      setPassword("");
      setError("");
      onLogin(response.data);
      navigate("/"); 
    })
    .catch(err => {
      console.error(err);
      setError("Login failed :(");
    });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
         <Link to="/SignupPage">Sign up</Link>
      </form>

    </div>
  );
}
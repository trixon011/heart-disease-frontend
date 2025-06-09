import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Auth.css';
import './Login.css';

const BASE_URL = "https://backend-5jrx.onrender.com/api"; // change to your deployed backend URL

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("loggedIn", "true");
        navigate("/");
      } else {
        setError(data.error || "Login failed.");
        setPassword("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

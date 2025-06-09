import React, { useState } from "react";
import './Auth.css';
import './Signup.css';

const BASE_URL = "https://backend-5jrx.onrender.com/api"; // change to your deployed backend URL

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful! You can now log in.");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage(data.error || "Signup failed.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="signup-container">
        <h2>Signup</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
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
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

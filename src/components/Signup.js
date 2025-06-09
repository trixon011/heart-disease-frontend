import React, { useState } from 'react';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://127.0.0.1:5000/api/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, password })
});


      const data = await res.json();

      if (res.ok) {
        setSuccess('Account created successfully! Please login.');
      } else {
        setError(data.error || data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'yellow', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: 'lightgreen', textAlign: 'center' }}>{success}</p>}
        <p className="auth-link">Already have an account? <a href="/login">Login</a></p>
      </form>
    </div>
  );
};

export default Signup;

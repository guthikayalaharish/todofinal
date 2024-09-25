import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for default credentials
    if (email === 'admin@gmail.com' && password === 'admin@123') {
      // Simulate successful login
      localStorage.setItem('token', 'dummy-token'); // Save a dummy token
      window.location.href = '/todos'; // Redirect to Todos
      return;
    }

    // If not the default user, proceed to check with the backend
    axios.post('http://localhost:5000/api/login', { email, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/todos';
      })
      .catch((error) => {
        alert('Invalid Credentials');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

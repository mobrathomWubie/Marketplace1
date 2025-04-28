import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
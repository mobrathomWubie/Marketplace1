import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <div className="register">
      <h2>Register</h2>
      <form>
        {/* Form fields will go here */}
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;

import React from 'react';
import { Link } from 'react-router-dom';
import './UserLayouts.css';

const UserLayout = ({ children }) => {
  return (
    <div className="user-layout">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/marketplace/home">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/mydatasets">My Datasets</Link>
          <Link to="/create-dataset">Create Dataset</Link>
          <Link to="/contact-creator">Contact Creator</Link>
        </div>
      </nav>
      <main className="main-content">{children}</main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Marketplace1. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserLayout;
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const UserLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/marketplace/home">Home</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/mydatasets">My Datasets</Link>
            <Link to="/create-dataset">Create Dataset</Link>
            <Link to="/contact-creator">Contact Creator</Link>
          </div>
        </nav>
        <main className="main-content">
          <Outlet />
        </main>
        </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/" className="nav-link">Marketplace</Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/new" className="nav-link">
                New Datasets
              </Link>
            </li>
              <li className="nav-item">
                <Link to="/featured" className="nav-link">
                  Featured
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/trending" className="nav-link">
                  Trending
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/browse" className="nav-link">
                  Browse Datasets
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">Contact Us</Link>
              </li>
          </ul>
        </nav>
        <div className="search-bar-container">
          <SearchBar />
        </div>
      </div>
    </header>
  );
}

export default Header;
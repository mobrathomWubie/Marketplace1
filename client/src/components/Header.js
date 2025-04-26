import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            {/* Replace with your actual logo */}
            <h1>Marketplace1</h1>
          </Link>
        </div>
        <nav>
          {/* Your navigation links */}
        </nav>
      </div>
    </header>
  );
};

export default Header;













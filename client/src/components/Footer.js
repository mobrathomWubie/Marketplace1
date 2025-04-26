import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>DataForDev Marketplace</h3>
        <p>Your source for curated datasets.</p>
      </div>
      <div className="footer-section">
        <h4>Links</h4>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/pricing">Pricing</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: contact@datafordev.com</p>
      </div>
    </div>
    <div className="footer-copyright">
      &copy; {new Date().getFullYear()} DataForDev Marketplace. All rights reserved.
    </div>
  </footer>
);

export default Footer;
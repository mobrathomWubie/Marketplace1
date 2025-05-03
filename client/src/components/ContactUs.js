import React from "react";
import "./ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-us-container">
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p className="intro-text">
          We value your feedback and are here to assist you. Please don't
          hesitate to reach out to us using the contact form below or through
          the alternative methods provided.
        </p>

        <div className="contact-methods">
          <h2>Alternative Contact Methods</h2>
          <p>
            For any inquiries, you can also contact us directly via:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@datamarketplace.com">
                support@datamarketplace.com
              </a>
            </li>
            <li>
              <strong>Phone:</strong> +1-555-123-4567
            </li>
          </ul>
        </div>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
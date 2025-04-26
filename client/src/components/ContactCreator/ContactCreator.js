import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ContactCreator = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to send a message.');
      return;
    }
    // Handle sending the message here (e.g., API call)
    console.log('Sending message:', { subject, message, user });
    setSubject('');
    setMessage('');
    alert('Message sent successfully!');
  };

  return (
    <div>
      <h2>Contact Creator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default ContactCreator;
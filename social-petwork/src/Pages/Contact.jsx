import React from 'react';
import '../App.css';

function Contact() {
  return (
    <div className="page-content">
      <h2>Contact Us</h2>
      <p></p>
      <p>
        Have questions, feedback, or just want to say hi? We'd love to hear from you!
        You can reach us on LinkedIn!
      </p>
      <ul style={{ listStyleType: "none", padding: 0, marginTop: "1rem" }}>
        <li>
          <a
            href="https://www.linkedin.com/in/angela-smith-4aa354278/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Angela Smith
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/anhelina-romanchuk-24b9412a8/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anhelina Romanchuk
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/bethann-penney"
            target="_blank"
            rel="noopener noreferrer"
          >
            Beth-Ann Penney
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/victoria-breen-b8888b26a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Victoria Breen
          </a>
        </li>
      </ul>
      <p></p>
    </div>
  );
}

export default Contact;


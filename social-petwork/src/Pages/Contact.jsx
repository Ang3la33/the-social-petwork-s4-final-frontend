import React from 'react';
import '../App.css';
import '../AboutPage.css'; 
import '../Contact.css';

function Contact() {
  return (
    <div className="page-content">
      <h2>Contact Us</h2>
      <p>
        Have questions, feedback, or just want to say hi? We'd love to hear from you!
        You can reach us on LinkedIn!
      </p>

      <ul className="contact-list">
        <li>
          <a href="https://www.linkedin.com/in/angela-smith-4aa354278/" target="_blank" rel="noopener noreferrer">
            <img src={require("../Assets/Images/angela.jpg")} alt="Angela Smith" className="mini-profile" />
            Angela Smith
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/anhelina-romanchuk-24b9412a8/" target="_blank" rel="noopener noreferrer">
            <img src={require("../Assets/Images/anhelina.jpg")} alt="Anhelina Romanchuk" className="mini-profile" />
            Anhelina Romanchuk
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/bethann-penney" target="_blank" rel="noopener noreferrer">
            <img src={require("../Assets/Images/bethann.jpg")} alt="Beth-Ann Penney" className="mini-profile" />
            Beth-Ann Penney
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/victoria-breen-b8888b26a/" target="_blank" rel="noopener noreferrer">
            <img src={require("../Assets/Images/victoria.jpg")} alt="Victoria Breen" className="mini-profile" />
            Victoria Breen
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Contact;



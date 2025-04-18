import React from 'react';
import '../App.css';
import '../Terms.css';

function Terms() {
  return (
    <div className="page-content">
      <h2>Terms & Conditions</h2>
      <p>
        Welcome to The Social Petwork! By using our platform, you're agreeing to be cool — to other users and to their pets. 🐾
      </p>

      <div className="terms-box">
        <h3>✅ Your Responsibilities</h3>
        <ul>
          <li>Be respectful to other users and their pets</li>
          <li>Keep your login credentials secure</li>
          <li>Use your account for personal, pet-loving purposes only</li>
        </ul>
      </div>

      <div className="terms-box">
        <h3>🛠️ Our Responsibilities</h3>
        <ul>
          <li>Keep the platform running and secure</li>
          <li>Protect your privacy and data</li>
          <li>Fix bugs and make improvements over time</li>
        </ul>
      </div>

      <div className="terms-box">
        <h3>🙅 What You Can’t Do</h3>
        <ul>
          <li>No spamming, harassment, or inappropriate content</li>
          <li>No impersonating others or pets</li>
          <li>No unauthorized commercial use of the platform</li>
        </ul>
      </div>

      <div className="terms-box">
        <h3>⚠️ Disclaimer</h3>
        <p>
          We do our best, but we can’t guarantee the platform will always be perfect or available.
          The Social Petwork is provided “as is” and “as available” — without warranties of any kind.
        </p>
      </div>

      <p className="terms-footer">
        If you have any questions or concerns about these terms, please reach out through our Contact page!
      </p>

      <p className="last-updated">
        Last updated: April 18, 2025
      </p>
    </div>
  );
}

export default Terms;

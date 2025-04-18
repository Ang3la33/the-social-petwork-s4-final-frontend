import React from 'react';
import '../App.css';
import '../Privacy.css';

function Privacy() {
  return (
    <div className="page-content">
      <h2>Privacy Policy</h2>
      <p>
        At The Social Petwork, your privacy matters to us — almost as much as our pets! 🐾
      </p>

      <div className="privacy-box">
        <h3>📦 What We Collect</h3>
        <ul>
          <li>Name and username</li>
          <li>Email address</li>
          <li>Optional: Profile images</li>
        </ul>
      </div>

      <div className="privacy-box">
        <h3>🔐 How We Use It</h3>
        <p>
          We use your info to keep the platform running smoothly and to help other pet lovers connect!
        </p>
      </div>

      <div className="privacy-box">
        <h3>🙅 What We Don't Do</h3>
        <ul>
          <li>No selling your data</li>
          <li>No creepy tracking</li>
          <li>No sharing with third parties without your pawmission 🐾</li>
        </ul>
      </div>

      <p className="privacy-footer">
        If you ever have questions, just send us a woof or a meow via our Contact page! 🐕🐈
      </p>

      <p className="last-updated">
        Last updated: April 18, 2025
      </p>
    </div>
  );
}

export default Privacy;

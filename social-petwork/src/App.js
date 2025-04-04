
import React from 'react';
import './App.css';

import Navbar from './Components/NavBar';
import Login from './Pages/Login.jsx';


function App() {
  return (

      <div className="App">
      <Navbar />
        <main className="mainContainer">
        </main>
        <footer className="footer">
          &copy; 2025 The Social Petwork
        </footer>
      </div>
  );
}

export default App;
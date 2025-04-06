
import React from 'react';
import './App.css';

import Navbar from './Components/NavBar';
import Login from './Pages/Login.jsx';
import Footer from './Components/Footer';


function App() {
  return (

      <div className="App">
      <Navbar />
        <main className="mainContainer">
        </main>
        {/* <footer className="footer">
          &copy; 2025 The Social Petwork
        </footer> */}
        <Footer />
      </div>
  );
}

export default App;
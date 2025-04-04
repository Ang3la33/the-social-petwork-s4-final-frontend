import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './Components/NavBar';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';



function App() {
  return (
    <Router>
      <div className="App">
        <main className="mainContainer">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <footer className="text-center mt-5 py-3 bg-light">
          &copy; 2025 The Social Petwork
        </footer>
      </div>
    </Router>
  );
}

export default App;
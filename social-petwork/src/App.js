import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Components/NavBar';
import Footer from './Components/Footer';

import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';

function Layout() {
  const location = useLocation();
  const noLayoutPaths = ['/', '/login', '/register'];
  const hideLayout = noLayoutPaths.includes(location.pathname);

  return (
    <div className="App">
      {!hideLayout && <Navbar />}

      <main className="mainContainer">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;

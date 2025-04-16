import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import Footer from './Components/Footer';
import Navbar from './Components/NavBar';

import { UserProvider } from './Context/UserContext';

import Landing from './Pages/Landing';
import Login from './Pages/Login';
import Post from "./Pages/Post";
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import BrowseUsers from './Pages/BrowseUsers';
import EditProfile from './Pages/EditProfile';

import About from './Pages/About';
import Contact from './Pages/Contact';


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
          <Route path="/post" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse-users" element={<BrowseUsers />} />

          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <Layout />
      </UserProvider>
    </Router>
  );
}

export default App;

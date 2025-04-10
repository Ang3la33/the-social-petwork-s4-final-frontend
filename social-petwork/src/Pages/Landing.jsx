import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Landing.css';
import landingImage from '../Assets/Images/landingpicture.png';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className='image-section'>
        <img src={landingImage} alt="Landing Image" className='landing-image' />
      </div>
      <div className='text-section'>
        <h1 className='title'>
          The <br />
          <span>Social</span> <br />
          <span>Petwork</span> 
        </h1>
        <p className='subtitle'>A Safe Place For Pet Lovers To Connect</p>
        <div className='button-group'>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;

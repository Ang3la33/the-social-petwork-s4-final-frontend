import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Landing.css';
import landingImage from '../Assets/Images/landingpicture.png';

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.cursor = 'url(../Assets/Images/paw-cursor.png), auto';
    return () => {
      document.body.style.cursor = 'auto';
    }
  })

  return (
    <div className="landing-container">
      <div className='image-section'>
        <img src={landingImage} alt="Landing Image" className='landing-image' />
      </div>
      <div className='text-section'>
        <h1 className='title'>
          The <br />
          Social<br />
          Petwork
        </h1>http://localhost:3000/static/media/landingpicture.cb4f2df04f760f21f09a.png
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

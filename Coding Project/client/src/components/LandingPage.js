import React from 'react';
import './styles.css';
import laptop from "../assets/laptopClipArt.svg";

const LandingPage = () => {
  return (
    <div className='landing-page'>
        <div className='image-container'>
          <img className = "laptop-img" src={laptop} alt="" />
          <img className = "laptop-img" src={laptop} alt="" />
          <img className = "laptop-img" src={laptop} alt="" />
        </div>

        <div className='image-container'>
          <img className = "laptop-img" src={laptop} alt="" />
          <img className = "laptop-img" src={laptop} alt="" />
          <img className = "laptop-img" src={laptop} alt="" />
        </div>

        <div className='image-container'>
          <img className = "laptop-img" src={laptop} alt="" />
          <img className = "laptop-img" src={laptop} alt="" />
          <img className = "laptop-img" src={laptop} alt="" />
        </div>
    </div>
  );
}

export default LandingPage;
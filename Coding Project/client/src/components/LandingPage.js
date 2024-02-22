import * as React from 'react';
import './styles.css';
import laptop from "../assets/laptopClipArt.svg";

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <div className='left-half'>
        <div className='div-title' style={{marginTop : "6rem"}}>
          <h1 className='land-title' style={{color: "white"}}>SIL</h1>
          <h1 className='land-title' style={{color: "#181D27"}}>ENT</h1>
        </div>

        <div className='div-title'>
          <h1 className='land-title' style={{color: "white"}}>SPA</h1>
          <h1 className='land-title' style={{color: "#181D27"}}>CES</h1>
        </div>

        <div className='div-title' style={{marginBottom : "2rem"}}>
          <h1 className='land-title' style={{color: "white"}}>LOC</h1>
          <h1 className='land-title' style={{color: "#181D27"}}>ATOR</h1>
        </div>

        <div className='button-div' >
          <button className='landing-button'>LOGIN</button>
          <button className='landing-button'>CREATE ACCOUNT</button>
        </div>
      
      </div>
      {/* <div className='image-container'>
        <img className = "laptop-img" src={laptop} alt="" />
        <img className = "laptop-img" src={laptop} alt="" />
        <img className = "laptop-img" src={laptop} alt="" />
      </div> */}
    </div>
  );
}

export default LandingPage;
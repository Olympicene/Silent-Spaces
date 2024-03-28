import * as React from 'react';
import { Link } from "react-router-dom";

import '../../style.css';
import laptop from "../../assets/laptop.svg";

const LandingPage = () => {
  return (

    <div className='landing-page'>
      <div className='left-half'>

        <div className='logo'>
          <div className='logo-left'>
            <h1 className='land-title' style={{color: "white"}}>SIL</h1>
            <h1 className='land-title' style={{color: "white"}}>SPA</h1>
            <h1 className='land-title' style={{color: "white"}}>LOC</h1>
          </div>

          <div className='logo-right'>
            <h1 className='land-title' style={{color: "#181D27"}}>ENT</h1>
            <h1 className='land-title' style={{color: "#181D27"}}>CES</h1>
            <h1 className='land-title' style={{color: "#181D27"}}>ATOR</h1>
          </div>
        </div>

        <div className='button-div' >
        <Link to="/log-in">
        <button className='landing-button'>LOGIN</button>
        </Link>
        <Link to="/sign-up">
        <button className='landing-button'>CREATE ACCOUNT</button>
        </Link>  
        </div>
      </div>

      <div className="landing-right-half">
      </div>

    </div>
  );
}

export default LandingPage;
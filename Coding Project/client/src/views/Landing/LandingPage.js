import * as React from 'react';
import { Link } from "react-router-dom";

import Button from '../../components/Button/Button';

const LandingPage = () => {
  require('./Landing.css')
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
          <Button theme="light" style={{width: "80%"}}>LOG IN</Button>
        </Link>

        <Link to="/sign-up">
          <Button theme="dark" style={{width: "80%"}}>CREATE ACCOUNT</Button>
        </Link>  
        </div>
      </div>

      <div className="landing-right-half">
      </div>

    </div>
  );
}

export default LandingPage;
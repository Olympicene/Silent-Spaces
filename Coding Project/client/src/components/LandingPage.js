import * as React from 'react';
import { Link } from "react-router-dom";

import './styles.css';
import laptop from "../assets/laptopClipArt.svg";

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

      <div className="right-half">

        <div className='gallery'>

          <div className='gallery__item gallery__item--1'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(-70deg)', paddingBottom: '4rem'}} alt=""/>
            </figure>
          </div>
          
          <div className='gallery__item gallery__item--2'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(180deg)', paddingBottom: '0.5rem'}} alt=""/>
            </figure>
          </div>

          <div className='gallery__item gallery__item--3'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(30deg)'}} alt=""/>
            </figure>
          </div>

          <div className='gallery__item gallery__item--4'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(60deg)', paddingBottom: '2rem'}} alt=""/>
            </figure>
          </div>

          <div className='gallery__item gallery__item--5'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(-30deg)', paddingBottom: '3rem'}} alt=""/>
            </figure>
          </div>

          <div className='gallery__item gallery__item--6'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(50deg)'}} alt=""/>
            </figure>
          </div>

          <div className='gallery__item gallery__item--7'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(-150deg)', paddingBottom: '3rem'}} alt=""/>
            </figure>
          </div>

          <div className='gallery__item gallery__item--8'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(70deg)'}} alt=""/>
            </figure>
          </div>

          <div className='gallery__item gallery__item--9'>
            <figure>
              <img  src={laptop} class="laptop-img" style = {{transform: 'rotate(120deg)', paddingBottom: '4rem'}} alt=""/>
            </figure>
          </div>

        </div>

      </div>

    </div>
  );
}

export default LandingPage;
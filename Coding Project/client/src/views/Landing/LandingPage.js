import * as React from 'react';
import { Link } from "react-router-dom";

import Button from '../../components/Button/Button';
import styles from './Landing.module.css'

const LandingPage = () => {
  return (

    <div className={styles['landing-page']}>
      <div className={styles['left-half']}>

        <div className={styles['logo']}>
          <div className={styles['logo-left']}>
            <h1 className={styles['land-title']} style={{color: "white"}}>SIL</h1>
            <h1 className={styles['land-title']} style={{color: "white"}}>SPA</h1>
            <h1 className={styles['land-title']} style={{color: "white"}}>LOC</h1>
          </div>

          <div className={styles['logo-right']}>
            <h1 className={styles['land-title']} style={{color: "#181D27"}}>ENT</h1>
            <h1 className={styles['land-title']} style={{color: "#181D27"}}>CES</h1>
            <h1 className={styles['land-title']} style={{color: "#181D27"}}>ATOR</h1>
          </div>
        </div>

        <div className={styles['button-div']} >
        <Link to="/log-in">
          <Button theme="light" style={{width: "80%"}}>LOG IN</Button>
        </Link>

        <Link to="/sign-up">
          <Button theme="dark" style={{width: "80%"}}>CREATE ACCOUNT</Button>
        </Link>  
        </div>
      </div>

      <div className={styles['landing-right-half']}>
      </div>

    </div>
  );
}

export default LandingPage;
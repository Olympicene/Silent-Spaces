import * as React from 'react';
import { Link } from "react-router-dom";

import Button from '../../components/Button/Button';
import styles from './Landing.module.css'
import logo from '../../assets/logo_white2.svg'

const LandingPage = () => {
  return (

    <div className={styles['main']}>
      <div className={styles['left-half']}>

        <div className={styles['logo']}>
          <img className={styles['title']} alt="logo" src={logo}/>
        </div>

        <div className={styles['CTA-buttons']} >
          <Link to="/log-in">
            <Button theme="light" style={{ width: "100%" }}>LOG IN</Button>
          </Link>

          <Link to="/sign-up">
            <Button theme="dark" style={{ width: "100%" }}>CREATE ACCOUNT</Button>
          </Link>
        </div>

      </div>

      <div className={styles['right-half']}></div>
    </div>
  );
}

export default LandingPage;
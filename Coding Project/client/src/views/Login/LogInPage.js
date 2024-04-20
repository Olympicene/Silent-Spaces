import React from 'react';
import Login from './LoginForm';
import styles from './Login.module.css';
import studyimage from "../../assets/abtractPeoplePeerProgramming.svg";


const LogIn = () => {

    return (
        <div className={styles['login-container']}>
            <div className={styles['left-half']}>
                <h1 className={styles['login-title']}>LOGIN</h1>
                <Login/>
            </div>
            
            <div className={styles['right-half']}>
                <img alt = "some people studying" className = 'peerprogram-img' src={studyimage}></img>
            </div>
        </div>
    )
}

export default LogIn;
import React from 'react';
import Login from './LoginForm';
import styles from './Login.module.css';
import studyimage from "../../assets/abtractPeoplePeerProgramming.svg";


const LogIn = () => {

    return (
        <div className={styles['main']}>
            <div className={styles['left-half']}>
                <Login/>
            </div>
            
            <div className={styles['right-half']}>
                <img alt = "some people studying" className = 'peerprogram-img' src={studyimage}></img>
            </div>
        </div>
    )
}

export default LogIn;
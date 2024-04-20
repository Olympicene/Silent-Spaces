import React from 'react';
import RegistrationForm from './CreateAccountForm';

import windowintoStudyGroup from "../../assets/windowIntoStudyGroup.svg";
import styles from "./CreateAccount.module.css"

const CreateAccount = () => {
    return (
        <div>
            <div className={styles['left half']}>
            <div className={styles['centered']}>
                <img src={windowintoStudyGroup} alt = ""/>
                <h2 style={{fontSize : 40, margin: 10}}>Welcome to</h2>
                <h2 style={{fontSize : 40, margin: 10}}>Silent Spaces Locator! </h2>
            </div>

            </div>
            <div className={styles['right half']}>
                <div className={styles['align-center']}>
                    <h1 style={{fontSize : 40}}> Create an Account</h1>
                    <RegistrationForm/>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;

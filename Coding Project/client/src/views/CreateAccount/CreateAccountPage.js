import React from 'react';
import RegistrationForm from './CreateAccountForm';

import windowintoStudyGroup from "../../assets/windowIntoStudyGroup.svg";
import styles from "./CreateAccount.module.css"

const CreateAccount = () => {
    return (
        <div className={styles['main']}>
            <div className={styles['left-half']}>
                <img alt = "some people studying" className={styles['img']} src={windowintoStudyGroup}></img>
            </div>
            
            <div className={styles['right-half']}>
                <RegistrationForm/>
            </div>
        </div>
    )
}

export default CreateAccount;

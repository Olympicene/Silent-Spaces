import React from 'react';
import RegistrationForm from './RegistrationForm';

import './styles.css';
import windowintoStudyGroup from "../assets/windowIntoStudyGroup.svg";

const CreateAccount = () => {
    return (
        <div>
            <div className="left half">
            <div className="centered">
                <img src={windowintoStudyGroup} alt = ""/>
                <h2>Welcome to</h2>
                <h2>Silent Spaces Locator </h2>
            </div>

            </div>
            <div className="right half">
                <div className='align-center'>
                    <h1> Create an Account</h1>
                    <RegistrationForm/>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;

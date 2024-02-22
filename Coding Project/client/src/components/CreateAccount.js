import React from 'react';
import './styles.css';
import windowintoStudyGroup from "../assets/windowIntoStudyGroup.svg";

const CreateAccount = () => {
    return (
        <div>
            <div class="left half">
            <div class="centered">
                <img src={windowintoStudyGroup} alt = ""/>
                <h2> Welcome to Silent Spaces Locator </h2>
            </div>

            </div>
            <div class="right half">
                <div class= "centered">
                    <h1> Create an Account</h1>
                    <form>
                        <input class="side" type="text" id="fname" name="fname" placeholder="First Name"/>
                        <input class="side" type="text" id="lname" name="lname" placeholder="Last Name"/>
                        <input type="text" id="user" name="user" placeholder="Username"/>
                        <input type="text" id="email" name="email" placeholder="Email"/>
                        <input type="text" id="password" name="password" placeholder="Password"/>
                    </form>

                    <div>
                        <input type="checkbox" id="scales" name="scales" checked />
                        <label for="scales">I agree that I am 13 years old or above</label>
                    </div>
                    <button class= "green-button">Create Account</button>
                </div>
            </div>
        </div>
        
        
    )
}

export default CreateAccount;

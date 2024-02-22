import React from 'react';
import './styles.css';
import windowintoStudyGroup from "../assets/windowIntoStudyGroup.svg";

const CreateAccount = () => {
    return (
        <div>
            <div class="left half">
            <div class="centered">
                <img src={windowintoStudyGroup} alt = ""/>
                <h2>Welcome to</h2>
                <h2>Silent Spaces Locator </h2>
            </div>

            </div>
            <div class="right half">
                <div class= "createAccount">
                    <h1> Create an Account</h1>
                    <form>
                        <input type="text" id="fname" size="10" name="fname" placeholder="First Name"/>
                        <input type="text" id="lname" size="11" name="lname" placeholder="Last Name"/>
                        <input type="text" id="user" size="30" name="user" placeholder="Username"/>
                        <input type="text" id="email" size="30" name="email" placeholder="Email"/>
                        <input type="password" id="password" size="30" name="password" placeholder="Password"/>
                        <div>
                            <input type="checkbox" id="ageLimit" name="ageLimit"/>
                            <label for="scales">I agree that I am 13 years old or above</label>
                        </div>
                        <input type="submit" class= "green-button" value="Create Account"/>
                    </form>
                </div>
            </div>
        </div>
        
        
    )
}

export default CreateAccount;

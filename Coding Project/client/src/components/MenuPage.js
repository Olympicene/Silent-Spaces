import React from 'react';
import './styles.css'; // Import the CSS file
import { ReactComponent as MapIcon } from "../assets/locationIcon.svg";
import { ReactComponent as ListIcon } from "../assets/clipboardIcon.svg";

const MenuPage = () => {
    return (
        <div className="container">
            <h1>Hi User</h1>
            <div className="subsection">
                <h2>Find a Space</h2>
                <div className="buttons-container">
                    <button>
                        <MapIcon style={{ width: '50px', height: '50px', fill: 'white' }} />
                        <span>From a Map</span>
                    </button>
                    <button>
                        <ListIcon style={{ width: '50px', height: '50px', fill: 'white' }} />
                        <span>From a List</span>
                    </button>
                </div>
            </div>
            <div className="subsection">
                <h2>Your Information</h2>
                <div className="buttons-container">
                    <button>Your Favorite Spaces</button>
                </div>
            </div>
            <div className="subsection">
                <div className="buttons-container">
                    <button>Settings</button>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
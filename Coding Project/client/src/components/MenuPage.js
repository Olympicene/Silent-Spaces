import React from 'react';
import './styles.css'; // Import the CSS file
import { ReactComponent as MapIcon } from "../assets/locationIcon.svg";
import { ReactComponent as ListIcon } from "../assets/clipboardIcon.svg";
import { ReactComponent as Border } from '../assets/abstractBookshelf.svg';

const MenuPage = () => {
    return (
        <div className="menu-container">
            <Border className="left-border" />
            <Border className="right-border" />
            <div>
                <h1 style={{ color: 'white' }}>Hi User</h1>
                <div className="subsection">
                    <h2 style={{ color: 'white' }}>Find a Space</h2>
                    <div className="buttons-container">
                        <button style={{ backgroundColor: '#69B578' }}>
                            <MapIcon class="icon" />
                            <span>Find using Location</span>
                        </button>
                        <button style={{ backgroundColor: '#3A7D44' }}>
                            <ListIcon class="icon" />
                            <span>Find from a List</span>
                        </button>
                    </div>
                </div>
                <h2 style={{ color: 'white' }}>Your Information</h2>
                <div className="buttons-container">
                    <button style={{ backgroundColor: '#3A7D44', width: '225px' }}>
                        Favorite Spaces
                    </button>
                    <button style={{ backgroundColor: '#D9D9D9', width: '225px', color: 'black' }}>
                        Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
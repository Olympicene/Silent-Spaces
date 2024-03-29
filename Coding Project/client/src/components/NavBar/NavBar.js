import React from 'react'
import { Link } from 'react-router-dom'
import {NavbarData} from './NavbarData'
import { IconContext } from 'react-icons';
import * as FaIcons from "react-icons/fa";
import './NavBar.css';

function NavBar() {
  return (
    <div >
      <IconContext.Provider value={{color:"#ffff", size:"2rem"}}>
      <nav className='nav-menu active'> 
        <ul className='nav-menu-items'>
          <h1 style={{marginTop:"1rem", marginBottom:"-10px"}}>SILENT</h1>
          <h1> SPACES</h1>
          {NavbarData.map((item, index) => {
            return (
              <li key = {index} className={item.className}>
                <Link to = {item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
          <div className='profile-section'>
            <div style={{marginRight: "0.5rem", backgroundColor: "grey", display: "flex", borderRadius : "50%"}}>
              <FaIcons.FaUser style={{color:"black", size:"2rem", margin:"0.5rem"}}/>
            </div>
      
            <div style={{display:"inline-block"}}>
              <p style={{fontSize:"1.2rem"}}>username</p>
              <p style={{fontSize:"1rem", color:"#595A5E"}}>email</p>
            </div>
          </div>
        </ul>
      </nav>
      </IconContext.Provider>
    </div>
  )
}

export default NavBar
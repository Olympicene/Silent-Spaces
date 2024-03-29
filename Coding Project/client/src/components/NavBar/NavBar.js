import React from 'react'
import { Link } from 'react-router-dom'
import {NavbarData} from './NavbarData'
import { IconContext } from 'react-icons';
import * as FaIcons from "react-icons/fa";

function NavBar() {
  require('./NavBar.css')
  return (

    <div >
      <IconContext.Provider value={{color:"#ffff", size:"2rem"}}>
      <nav className='nav-menu active'> 
        <ul className='nav-menu-items'>
          <h1 style={{marginTop:"1.5rem", marginBottom:"-10px", marginLeft:"25px"}}>SILENT</h1>
          <h1 style={{marginLeft:"25px"}}> SPACES</h1>
          {NavbarData.map((item, index) => {
            return (
              <li key = {index} className={item.className}>
                <Link to = {item.path}>
                  {item.icon}
                  <span className='navbar-span'>{item.title}</span>
                </Link>
              </li>
            )
          })}
          <div className='profile-section'>
            <div style={{marginRight: "0.5rem", backgroundColor: "grey", display: "flex", borderRadius : "50%"}}>
              <FaIcons.FaUser style={{color:"black", size:"2rem", margin:"0.5rem"}}/>
            </div>
      
            <div style={{display:"inline-block"}}>
              <p style={{fontSize:"1.2rem", margin: "0", padding: "0"}}>username</p>
              <p style={{fontSize:"1rem", color:"#595A5E", margin: "0", padding: "0"}}>email</p>
            </div>
          </div>
        </ul>
      </nav>
      </IconContext.Provider>
    </div>
  )
}

export default NavBar
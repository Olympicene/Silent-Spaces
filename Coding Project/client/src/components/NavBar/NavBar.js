import React from 'react'
import { Link } from 'react-router-dom'
import {NavbarData} from './NavbarData'
import { IconContext } from 'react-icons';
import './NavBar.css';

function NavBar() {
  return (
    <div>
      <IconContext.Provider value={{color:"#ffff", size:"2rem"}}>
      <nav className='nav-menu active'> 
        <ul className='nav-menu-items'>
        <h1 style={{marginTop:"1rem"}}>SILENT</h1>
        <h1>SPACES</h1>
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

        </ul>
      </nav>
      </IconContext.Provider>
    </div>
  )
}

export default NavBar
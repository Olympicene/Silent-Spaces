import React from 'react'
import { Link } from 'react-router-dom'
import {NavbarData} from './NavbarData'

function NavBar() {
  return (
    <>
        <div className='navbar'>
            <nav className='nav-menu'>
              <ul className='nav-menu-items'>
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
        </div>
    </>
  )
}

export default NavBar
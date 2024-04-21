import React from 'react'
import { Link } from 'react-router-dom'
import { NavbarData } from './NavbarData'
import { IconContext } from 'react-icons';
import * as FaIcons from "react-icons/fa";
import logo from '../../assets/logo_white2.svg'
import styles from "./NavBar.module.css"

function NavBar({ info, page }) {

  return (

    <div style={{ position: "fixed" }}>
      <IconContext.Provider value={{ color: "#ffff", size: "2rem" }}>
        <nav className={[styles['nav-menu'], styles['active']].join(' ')}>
          <ul className={styles['nav-menu-items']}>
            <Link to="/home">
              <img className={styles['title']} alt="logo" src={logo} />
            </Link>

            {/* <h1 style={{marginTop:"1.5rem", marginBottom:"-10px", marginLeft:"25px"}}>SILENT</h1>
          <h1 style={{marginLeft:"25px"}}> SPACES</h1> */}
            {NavbarData.map((item, index) => {
              return (
                <li key={index} className={styles[page === item.title ? "nav-text-focus" : item.className]}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className={styles['navbar-span']}>{item.title}</span>
                  </Link>
                </li>
              )
            })}
            <Link to="/settings">
              <div className={styles['profile-section']}>
                <div style={{ margin: "0.5rem 1.5rem 0.5rem 1rem", backgroundColor: "grey", display: "flex", borderRadius: "50%" }}>
                  <FaIcons.FaUser style={{ color: "black", size: "2rem", margin: "0.5rem" }} />
                </div>

                <div style={{ display: "inline-block" }}>
                  <p style={{ color: "black", fontSize: "1.2rem", margin: "0", padding: "0" }}>{info.first_name + " " + info.last_name}</p>
                  <p style={{ fontSize: "1rem", color: "#595A5E", margin: "0", padding: "0" }}>{info.email}</p>
                </div>
              </div>
            </Link>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  )
}

export default NavBar
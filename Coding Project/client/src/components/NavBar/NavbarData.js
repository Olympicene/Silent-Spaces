import React from 'react'
import * as Io5Icons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";

export const NavbarData = [
    {
        title : "home",
        path : "/menu",
        icon : <Io5Icons.IoHome/>,
        className : 'nav-text'
    },
    {
        title : "map",
        path : "/log-in",
        icon : <FaIcons.FaMapMarkerAlt />,
        className : 'nav-text'
    },
    {
        title : "resources",
        path : "/",
        icon : <FaIcons.FaBook />,
        className : 'nav-text'
    },
    {
        title : "settings",
        path : "/",
        icon : <Io5Icons.IoSettingsSharp />,
        className : 'nav-text'
    }
]
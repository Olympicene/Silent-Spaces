import React from 'react'
import * as Io5Icons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";


export const NavbarData = [
    {
        title : "home",
        path : "/home",
        icon : <Io5Icons.IoHome/>,
        className : 'nav-text'
    },
    {
        title : "map",
        path : "/map",
        icon : <FaIcons.FaMapMarkerAlt />,
        className : 'nav-text'
    },
    {
        title : "favorites",
        path : "/favorites",
        icon : <FaIcons.FaHeart />,
        className : 'nav-text'
    },
    {
        title : "calendar",
        path : "/calendar",
        icon : <FaIcons.FaCalendar/>,
        className : 'nav-text'
    },
    {
        title : "study hub",
        path : "/study-hub",
        icon : <ImIcons.ImLibrary/>,
        className : 'nav-text'
    },
    {
        title : "resources",
        path : "/resources",
        icon : <FaIcons.FaBook />,
        className : 'nav-text'
    },
    {
        title : "settings",
        path : "/settings",
        icon : <Io5Icons.IoSettingsSharp />,
        className : 'nav-text'
    }
]
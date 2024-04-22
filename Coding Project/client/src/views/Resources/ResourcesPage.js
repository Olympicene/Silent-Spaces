import React from "react";
import NavBar from '../../components/NavBar/NavBar';
import ResourceTile from "../../components/ResourceTile/ResourceTile";
import libimg from "../../assets/resourcetile.svg";
import wicsimg from "../../assets/wics.svg";
import campusimg from "../../assets/campus.svg";
import internimg from "../../assets/intern.svg";
import studentorgimg from "../../assets/studentorg.svg";
import trackersimg from "../../assets/trackers.svg";
import styles from "./Resources.module.css"

const ResourcesPage = () => {

    const dummyuser = {
        first_name: 'Kevin',
        last_name: 'Cordero',
        email: 'thing@gmail.com',
    }

    const resourceData = [
        {
            title : "book a room at the daley library for your next study group",
            link : "https://libcal.uic.edu/reserve/spaces/daley",
            image : libimg
        },
        {
            title : "book the wics lounge for your next meeting",
            link : "mailto:uicwics@gmail.com",
            image : wicsimg
        },
        {
            title : "study tips and tricks - uic campus resources",
            link : "https://www.uic.edu/life-at-uic/campus-resources/",
            image : campusimg
        },
        {
            title : "join a cs student organization!",
            link : "https://cs.uic.edu/undergraduate/student-organizations/",
            image : studentorgimg
        },
        {
            title : "join cs trackers discord!",
            link : "https://discord.gg/UxHz96qa",
            image : trackersimg
        },
        {
            title : "list of summer 2024 internships",
            link : "https://github.com/SimplifyJobs/Summer2024-Internships/tree/dev",
            image : internimg
        }
    ]

    return (
        <div className={styles['resources-page']}>
            <NavBar info={dummyuser} page="resources" />
            <div className={styles['resource-right']}>
                <h1 className={styles['resource-header']}>RESOURCE LIBRARY</h1>
                    {resourceData.map((item, index) => {
                    return (
                        <ResourceTile data={item}/>
                    )
                    })}
            </div>
        </div>
    );
}

export default ResourcesPage;
import React from "react";
import NavBar from '../../components/NavBar/NavBar';
import ResourceTile from "../../components/ResourceTile/ResourceTile";

const ResourcesPage = () => {
    require('./ResourcesPage.css')

    const dummyuser = {
        first_name: 'naan',
        last_name: 'sheri',
        email: 'urmom@gmail.com',
    }

    const resourceData = [
        {
            title : "book a room at the daley library for your next study group",
            link : "https://libcal.uic.edu/reserve/spaces/daley"
        },
        {
            title : "book the wics lounge for your next meeting",
            link : "mailto:uicwics@gmail.com"
        },
        {
            title : "study tips and tricks - uic campus resources",
            link : "https://www.uic.edu/life-at-uic/campus-resources/"
        },
        {
            title : "join a cs student organization!",
            link : "https://cs.uic.edu/undergraduate/student-organizations/"
        },
        {
            title : "join cs trackers discord!",
            link : "https://discord.gg/UxHz96qa"
        },
        {
            title : "list of summer 2024 internships",
            link : "https://github.com/SimplifyJobs/Summer2024-Internships/tree/dev"
        }
    ]

    return (
        <div className="resources-page">
            <NavBar info={dummyuser} page="resources" />
            <div className="resource-right">
                <h1 className="resource-header">RESOURCE LIBRARY</h1>
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
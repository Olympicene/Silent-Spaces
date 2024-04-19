import React from "react";

const ResourceTile = ({data}) => {
    console.log(data)

    require('./ResourceTile.css');
    return (
        <div className="resource-tile">
            <img src={data.image}></img>
            <div className="resource-content" >
                <h2>{data.title}</h2>
                <div className="resource-link">
                    <a href={data.link}>learn more</a>
                </div>
            </div>
        </div>
    );
}

export default ResourceTile
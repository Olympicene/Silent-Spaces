import React from "react";
import tileimage from "../../assets/resourcetile.svg";

const ResourceTile = ({data}) => {
    console.log(data)

    require('./ResourceTile.css');
    return (
        <div className="resource-tile">
            <img src={tileimage}></img>
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
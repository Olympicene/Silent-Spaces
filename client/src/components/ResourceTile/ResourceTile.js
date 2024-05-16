import React from "react";
import styles from "./ResourceTile.module.css"

const ResourceTile = ({data}) => {
    console.log(data)

    return (
        <div className={styles['resource-tile']}>
            <div className={styles['resource-image']}>
                <img src={data.image} style={{width:"100%", objectFit: "cover"}}></img>
            </div>
            <div className={styles['resource-content']} >
                <h2>{data.title}</h2>
                <div className={styles['resource-link']}>
                    <a href={data.link}>learn more</a>
                </div>
            </div>
        </div>
    );
}

export default ResourceTile
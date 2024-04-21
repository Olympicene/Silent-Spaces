import React from "react";
import styles from "./Amenity.module.css"

const Amenity = ({children, style}) => {
    return (
        <div 
            className={styles['amenity']} 
            style = {style}>
                
            {children}
        </div>
    );
}

export default Amenity;
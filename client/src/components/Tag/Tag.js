import React from "react";
import styles from "./Tag.module.css"

const Tag = ({children, style}) => {
    return (
        <div 
            className={styles['tag']} 
            style = {style}>
                
            {children}
        </div>
    );
}

export default Tag;
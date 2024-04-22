import React, {useState} from "react";
import styles from "./SpaceLive.module.css"

const SpaceLive = ({stats, style}) => {   

    return (
        <div className={styles["space-live"]} style={{position: "relative", margin: "20px 0"}}> 
            <p style={{position: "absolute", left: 15, top: -10}}>Live 🔴</p>
            <div style={{display: "flex", justifyContent: "space-evenly", padding: "20px 0"}}>
                <h1>10db</h1>
                <div style={{  borderLeft: "2px solid #254D32"}}></div>
                <h1 >~30ppl</h1>   
                <div style={{  borderLeft: "2px solid #254D32"}}></div>
                <h1>10ms</h1>           
            </div>
        </div>
    );
}

export default SpaceLive;
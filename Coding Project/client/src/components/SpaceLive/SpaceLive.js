import React, {useState} from "react";
import styles from "./SpaceLIve.module.css"

const SpaceStats = ({stats, style}) => {   

    return (
        <div style={{position: "relative"}} className='space-stats'> 
            <p style={{position: "absolute", left: 15, top: -10}}>Live 🔴</p>
            <div style={{display: "flex", justifyContent: "space-evenly", marginTop: "20px"}}>
                <h1>10db</h1>
                <div style={{  borderLeft: "thick solid #ff0000"}}></div>
                <h1 >~30ppl</h1>   
                <div style={{  borderLeft: "thick solid #ff0000"}}></div>
                <h1>10ms</h1>           
            </div>
        </div>
    );
}

export default SpaceStats;
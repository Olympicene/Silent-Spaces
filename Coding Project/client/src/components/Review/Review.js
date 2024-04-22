import React from "react";
import styles from "./Review.module.css"
import { AccountCircle } from "@mui/icons-material";


const Review = ({data}) => {

    return (
        <div className={styles['review']}>
            <div>
                <AccountCircle fontSize="large"/>
            </div>

            @{data.username}
            <div>
                {data.comment}
            </div>
        </div>
    );
}

export default Review
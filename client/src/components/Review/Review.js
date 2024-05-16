import React from "react";
import styles from "./Review.module.css"
import Avatar from '@mui/joy/Avatar';
import { Typography } from "@mui/material";
import { Star } from "@mui/icons-material";

const Review = ({ data }) => {

    return (
        <div className={styles['review']}>
            <div className={styles['reviewer-info']}>

                <div className={styles['profile']}>
                    <Avatar
                        alt={data.username}
                        sx={{ backgroundColor: "#d9d9d9" }}
                        color="neutral"
                        size="md"
                        variant="solid"
                    />
                    <p className={styles['username']}>{data.username}</p>
                </div>
                <div className={styles['rating']}>
                    <Star sx={{ height: "4rem", color: "black" }} />
                    <h2>{((data.statistics.noiseLevels + data.statistics.occupancy + data.statistics.connectivity) / 3).toFixed(1)}</h2>
                </div>
            </div>
            <div className={styles['comment']}>
                {data.comment}
            </div>
        </div>
    );
}

export default Review
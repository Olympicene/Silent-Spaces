import mongoose from "mongoose"
import CheckIn from "../models/CheckIn.js"
import moment from "moment"


// get all Check-ins
/**
 * 
 * @route GET /checkin
 * @desc Get all the check ins created
 * @access Public
 * 
 * @input user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/checkin
 * @outputExample -- next comment block
 */
/* 
{
    "status": "success",
    "data": [
        [
            {
                "_id": "661ddc323117ec3d8a4f8fb0",
                "id": 2,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 45,
                "connectivity": 4,
                "createdAt": "2024-04-16T02:02:26.478Z",
                "updatedAt": "2024-04-16T02:02:26.478Z",
                "__v": 0
            },
            {
                "_id": "661ddb673117ec3d8a4f8fae",
                "id": 1,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 25,
                "occupancy": 40,
                "connectivity": 2,
                "createdAt": "2024-04-16T01:59:03.410Z",
                "updatedAt": "2024-04-16T01:59:03.410Z",
                "__v": 0
            },
            {
                "_id": "661ddb113117ec3d8a4f8fac",
                "id": 0,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 30,
                "connectivity": 19,
                "createdAt": "2024-04-16T01:57:37.520Z",
                "updatedAt": "2024-04-16T01:57:37.520Z",
                "__v": 0
            },
            {
                "_id": "661ddaf3bb83d9c0efb128a1",
                "id": 0,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 30,
                "connectivity": 19,
                "createdAt": "2024-04-16T01:57:07.482Z",
                "updatedAt": "2024-04-16T01:57:07.482Z",
                "__v": 0
            },
            {
                "_id": "661ddac48a274a597016292d",
                "id": 0,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 30,
                "connectivity": 19,
                "createdAt": "2024-04-16T01:56:20.277Z",
                "updatedAt": "2024-04-16T01:56:20.277Z",
                "__v": 0
            }
        ]
    ],
    "message": "Reviews recieved successfully"
}

*/
export async function getCheckin (req,res) {
    try {
        const checkin = await CheckIn.find().sort({createdAt: -1})
        res.status(200).json({
            status: "success",
            data: [checkin],
            message: "Reviews recieved successfully"
        })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }

}

// get all Check-ins from one space
/**
 * 
 * @route GET /checkin/<id>
 * @desc Get all the check ins created for a specific space id
 * @access Public
 * 
 * @input space_id for the space we want to check into
 *        user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/checkin/1
 * @outputExample -- next comment block
 */
/* 
{
    "status": "success",
    "data": [
        [
            {
                "_id": "661ddc323117ec3d8a4f8fb0",
                "id": 2,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 45,
                "connectivity": 4,
                "createdAt": "2024-04-16T02:02:26.478Z",
                "updatedAt": "2024-04-16T02:02:26.478Z",
                "__v": 0
            },
            {
                "_id": "661ddb673117ec3d8a4f8fae",
                "id": 1,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 25,
                "occupancy": 40,
                "connectivity": 2,
                "createdAt": "2024-04-16T01:59:03.410Z",
                "updatedAt": "2024-04-16T01:59:03.410Z",
                "__v": 0
            },
            {
                "_id": "661ddb113117ec3d8a4f8fac",
                "id": 0,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 30,
                "connectivity": 19,
                "createdAt": "2024-04-16T01:57:37.520Z",
                "updatedAt": "2024-04-16T01:57:37.520Z",
                "__v": 0
            },
            {
                "_id": "661ddaf3bb83d9c0efb128a1",
                "id": 0,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 30,
                "connectivity": 19,
                "createdAt": "2024-04-16T01:57:07.482Z",
                "updatedAt": "2024-04-16T01:57:07.482Z",
                "__v": 0
            },
            {
                "_id": "661ddac48a274a597016292d",
                "id": 0,
                "space_id": 1,
                "username": "emend7",
                "noiseLevels": 26,
                "occupancy": 30,
                "connectivity": 19,
                "createdAt": "2024-04-16T01:56:20.277Z",
                "updatedAt": "2024-04-16T01:56:20.277Z",
                "__v": 0
            }
        ]
    ],
    "message": "Reviews recieved successfully"
}
*/
export async function getCheckinbySpace (req,res) {
    const { id } = req.params
    try {
        const checkin = await CheckIn.find({space_id: id}).sort({createdAt: -1})
        res.status(200).json({
            status: "success",
            data: [checkin],
            message: "Reviews recieved successfully"
        })
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

// get all Check In from the past 15 minutes
/**
 * 
 * @route GET /checkin/live/<id>
 * @desc Get all the check ins created for a specific space id within the last 15 minutes
 * @access Public
 * 
 * @input space_id for the space we want to check into
 *        user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/checkin/live/1
 * @outputExample -- next comment block
 */
/** if there is no data from the last 15 minutes
 * 
 {
    "error": "No live data avaliable"
}
 */

/* if there is live data within the last 15 minutes
{
    "status": "success",
    "Overall_Score": "20.0",
    "Overall_Noise": "24.5",
    "Overall_Occupancy": "27.5",
    "Overall_Connectivity": "8.0",
    "Total_Reviews": 2,
    "message": "Live Data recieved successfully"
}
*/
export async function getRecentCheckin (req, res) {
    const { id } = req.params
    try {
        const time = moment().subtract(15, 'minutes');

        const checkins = await CheckIn.find({space_id: id, createdAt: {$gte: time}}).sort({createdAt: -1})

        if (checkins.length <= 0){
            return res.status(404).json({error: "No live data avaliable"})
        }
        //get the total sum of all stats
        const total_noise = checkins.reduce((acc, checkin) => acc + checkin.noiseLevels, 0);
        const total_occ = checkins.reduce((acc, checkin) => acc + checkin.occupancy, 0);
        const total_connect = checkins.reduce((acc, checkin) => acc + checkin.connectivity, 0);
        
        //get the average
        const average_noise = (total_noise / checkins.length).toFixed(1);
        const average_occ = (total_occ / checkins.length).toFixed(1);
        const average_connect = (total_connect / checkins.length).toFixed(1);

        //calcualte the total
        const sum = (parseFloat(average_noise) + parseFloat(average_occ) + parseFloat(average_connect)).toFixed(2);
        const overall_average = (parseFloat(sum) / 3.0).toFixed(1);

        res.status(200).json({
            status: "success",
            Overall_Score: overall_average,
            Overall_Noise: average_noise,
            Overall_Occupancy: average_occ,
            Overall_Connectivity: average_connect,
            Total_Reviews: checkins.length,
            message: "Live Data recieved successfully"
        })
    } catch (err) {
        res.status(500).json({ message: 'Not enough data present' });
    }
}

// add Check In
/**
 * 
 * @route POST /checkin/
 * @desc POST a new checkin object
 * @access Public
 * 
 * @input {
    "id": number,
    "space_id": number,
    "username": string,
    "noiseLevels": 23,          <--- in decibels
    "occupancy": 10,            <--- people observed
    "connectivity": 12          <--- latency (used internet speed test)
}
 *        user is logged in
 * 
 * @inputExample -- POST http://localhost:5005/checkin/
 * @outputExample -- next comment block
 */
/**{
    "status": "success",
    "data": [
        {
            "id": 4,
            "space_id": 1,
            "username": "emend7",
            "noiseLevels": 23,
            "occupancy": 10,
            "connectivity": 12,
            "_id": "661de153a5c496a7daa64aeb",
            "createdAt": "2024-04-16T02:24:19.299Z",
            "updatedAt": "2024-04-16T02:24:19.299Z",
            "__v": 0
        }
    ],
    "message": "thank you for adding this check in"
} */
export async function postCheckin (req, res) {
    const { id, space_id, username, noiseLevels, occupancy, connectivity } = req.body

    try {
        const checkin = await CheckIn.create({id, space_id, username, noiseLevels, occupancy, connectivity})

        res.status(200).json({
            status: "success",
            data: [checkin],
            message: "thank you for adding this check in"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error"
        })
    }
}


import mongoose from "mongoose"
import Review from "../models/Review.js"
import Mongoose from "mongoose"

/**
 * 
 * @route GET /review/
 * @desc Get all the reviews that have ever been posted
 * @access Public
 * 
 * @input : user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/review/
 * @outputExample -- next comment block
 */
/**
 * 
 * {
    "status": "success",
    "data": [
        {
            "_id": "6606036e80b695a0bf503d3e",
            "review_id": 3,
            "space_id": 2,
            "email": "michael.johnson@example.com",
            "comment": "Overall a good experience, but the noise level was a bit high.",
            "amenities": {
                "has_outlets": true,
                "has_whiteboards": true,
                "has_screen": true,
                "is_food_beverage_friendly": true,
                "has_printer": true,
                "has_breakout_rooms": false,
                "restrooms": true,
                "seating_type": "Group Seating",
                "_id": "6606036e80b695a0bf503d3f"
            },
            "statistics": {
                "noiseLevels": 3.5,
                "occupancy": 3,
                "connectivity": 4,
                "_id": "6606036e80b695a0bf503d40"
            },
            "createdAt": "2024-03-28T23:55:26.303Z",
            "updatedAt": "2024-03-28T23:55:26.303Z",
            "__v": 0
        },
        ...
        ]
    }
 */
export async function getReviews (req,res) {
    const reviews = await Review.find({}).sort({createdAt: -1})
    res.status(200).json({
        status: "success",
        data: reviews,
        message: "All Reviews Recieved."})
}

/**
 * 
 * @route GET /review/:id
 * @desc Get all the reviews that have ever been posted for a specific space
 * @access Public
 * 
 * @input : id - id of space you want to 
 *          user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/review/123
 * @outputExample -- next comment block
 */
/**
 * 
 * {
    "status": "success",
    "data": [
        {
            "_id": "6605ebed665b96d4f854b104",
            "review_id": 123,
            "space_id": 1,
            "email": "example@uic.edu",
            "comment": "This space was very gross",
            "amenities": {
                "has_outlets": true,
                "has_whiteboards": false,
                "has_screen": true,
                "is_food_beverage_friendly": true,
                "has_printer": false,
                "has_breakout_rooms": true,
                "restrooms": true,
                "seating_type": "Group Seating",
                "_id": "6605ebed665b96d4f854b105"
            },
            "statistics": {
                "noiseLevels": 4,
                "occupancy": 3.5,
                "connectivity": 5,
                "_id": "6605ebed665b96d4f854b106"
            },
            "createdAt": "2024-03-28T22:15:09.717Z",
            "updatedAt": "2024-03-28T23:37:29.873Z",
            "__v": 0
        }
    ],
    "message": "Review Found."
}
 * 
 */
export async function getSpaceReviews (req,res) {
    const { space_id } = req.params
    const reviews = await Review.find({space_id: space_id}).sort({createdAt: -1})
    res.status(200).json({
        status: "success",
        data: reviews,
        message: 'Reviews recieved successfully for space ${space_id}.'})
}

/**
 * 
 * @route GET /review/:id
 * @desc Get a specific review
 * @access Public
 * 
 * @input : id - id of review you want  
 *          user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/review/123
 * @outputExample -- next comment block
 */

/**
 * 
 {
    "status": "success",
    "data": [
        {
            "_id": "6605ebed665b96d4f854b104",
            "review_id": 123,
            "space_id": 1,
            "email": "example@uic.edu",
            "comment": "This space was very gross",
            "amenities": {
                "has_outlets": true,
                "has_whiteboards": false,
                "has_screen": true,
                "is_food_beverage_friendly": true,
                "has_printer": false,
                "has_breakout_rooms": true,
                "restrooms": true,
                "seating_type": "Group Seating",
                "_id": "6605ebed665b96d4f854b105"
            },
            "statistics": {
                "noiseLevels": 4,
                "occupancy": 3.5,
                "connectivity": 5,
                "_id": "6605ebed665b96d4f854b106"
            },
            "createdAt": "2024-03-28T22:15:09.717Z",
            "updatedAt": "2024-03-28T23:37:29.873Z",
            "__v": 0
        }
    ],
    "message": "Review Found."
}
 */

// GET a single review
export async function getReview (req, res) {
    const { id } = req.params

    // will check to see if the id is valid
    // if (!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: "No such review"})
    // }
    // uses the review id and not the object id
    const review = await Review.findOne({review_id: id})
    if (!review){
        return res.status(404).json({error: "No such review"})
    }

    res.status(200).json({
        status: "success",
        data: [review],
        message: "Review Found."})
}

/**
 * 
 * @route GET /review/:id/score
 * @desc Calculate the scores given by api and create a calculation total
 * @access Public
 * 
 * @input : id - id of space you want to 
 *          user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/review/1/score
 * @outputExample -- next comment block
 */

/* 
{
    "status": "success",
    "Overall_Score": "3.7",
    "Overall_Noise": "3.0",
    "Overall_Occupancy": "3.8",
    "Overall_Connectivity": "4.3",
    "message": "Review Statistics Calculated Successfully"
}
*/

export async function getSpaceAverages (req, res) {
    const { space_id } = req.params

    try {
        const reviews = await Review.find({space_id: space_id});
        
        // Calculate the total sum of all Levels using an aggregate function 
        const total_noise = reviews.reduce((acc, review) => acc + review.statistics.noiseLevels, 0);
        const total_occ = reviews.reduce((acc, review) => acc + review.statistics.occupancy, 0);
        const total_connect = reviews.reduce((acc, review) => acc + review.statistics.connectivity, 0);

        // Calculate the average Levels
        const average_noise = (total_noise / reviews.length).toFixed(1);
        const average_occ = (total_occ / reviews.length).toFixed(1);
        const average_connect = (total_connect / reviews.length).toFixed(1);
        
        const sum = (parseFloat(average_noise) + parseFloat(average_occ) + parseFloat(average_connect)).toFixed(2);
        const overall_average = (parseFloat(sum) / 3.0).toFixed(1);

        res.status(200).json({ 
            status: "success",
            Overall_Score: overall_average,
            Overall_Noise: average_noise,
            Overall_Occupancy: average_occ,
            Overall_Connectivity: average_connect,
            message: "Review Statistics Calculated Successfully"
         });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * 
 * @route POST /review/
 * @desc Add a new review for a space
 * @access Public
 * 
 * @input : 
 *          user is logged in
 * 
 * @inputExample -- POST http://localhost:5005/review/
 * @outputExample -- next comment block
 */

/* 
{
  "review_id": 125,
  "space_id": 1,
  "email": "examp2e@uic.edu",
  "comment": "This space was fantastic!",
  "amenities": {
    "has_outlets": true,
    "has_whiteboards": false,
    "has_screen": true,
    "is_food_beverage_friendly": true,
    "has_printer": false,
    "has_breakout_rooms": true,
    "restrooms": true,
    "seating_type": "Group Seating"
  },
  "statistics": {
    "noiseLevels": 4,
    "occupancy": 3.5,
    "connectivity": 5
  }
}

*/

/**
{
    "status": "success",
    "data": [
        {
            "review_id": 125,
            "space_id": 1,
            "email": "examp2e@uic.edu",
            "comment": "This space was fantastic!",
            "amenities": {
                "has_outlets": true,
                "has_whiteboards": false,
                "has_screen": true,
                "is_food_beverage_friendly": true,
                "has_printer": false,
                "has_breakout_rooms": true,
                "restrooms": true,
                "seating_type": "Group Seating",
                "_id": "661c5a63fc60b3c6f0c1a3ae"
            },
            "statistics": {
                "noiseLevels": 4,
                "occupancy": 3.5,
                "connectivity": 5,
                "_id": "661c5a63fc60b3c6f0c1a3af"
            },
            "_id": "661c5a63fc60b3c6f0c1a3ad",
            "createdAt": "2024-04-14T22:36:19.416Z",
            "updatedAt": "2024-04-14T22:36:19.416Z",
            "__v": 0
        }
    ],
    "message": "Thank you for adding this review."
}
 */

// POST one review
export async function postReview (req, res) {
    
    const {review_id, space_id, email, comment, amenities, statistics} = req.body

    try {
        const review = await Review.create({review_id, space_id, email, comment, amenities, statistics})
        res.status(200).json({
            status: "success",
            data: [review],
            message: "Thank you for adding this review."
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error"
        })
    }
}

/**
 * 
 * @route DELETE /review/:id
 * @desc Deletes a specific review
 * @access Public
 * 
 * @input : id - id of space you want to 
 *          user is logged in
 * 
 * @inputExample -- DELETE http://localhost:5005/review/125
 * @outputExample -- next comment block
 */



/**
 * 
{
    "status": "success",
    "data": [
        {
            "_id": "661c5a63fc60b3c6f0c1a3ad",
            "review_id": 125,
            "space_id": 1,
            "email": "examp2e@uic.edu",
            "comment": "This space was fantastic!",
            "amenities": {
                "has_outlets": true,
                "has_whiteboards": false,
                "has_screen": true,
                "is_food_beverage_friendly": true,
                "has_printer": false,
                "has_breakout_rooms": true,
                "restrooms": true,
                "seating_type": "Group Seating",
                "_id": "661c5a63fc60b3c6f0c1a3ae"
            },
            "statistics": {
                "noiseLevels": 4,
                "occupancy": 3.5,
                "connectivity": 5,
                "_id": "661c5a63fc60b3c6f0c1a3af"
            },
            "createdAt": "2024-04-14T22:36:19.416Z",
            "updatedAt": "2024-04-14T22:36:19.416Z",
            "__v": 0
        }
    ],
    "message": "Review deleted successfully!"
}
 */

export async function deleteReview (req, res) {
    const { id } = req.params

    // will check to see if the id is valid
    // if (!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: "No such review"})
    // }
    
    const review = await Review.findOneAndDelete({review_id: id})
    if (!review){
        return res.status(404).json({error: "No such review"})
    }

    // res.status(200).json(review)
    res.status(200).json({
        status: "success",
        data: [review],
        message: "Review deleted successfully!"
    })
}

/**
 * 
 * @route PATCH /review/update/:id
 * @desc Get all the reviews that have ever been posted for a specific space
 * @access Public
 * 
 * @input : id - id of space you want to 
 *          user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/review/123
 * see below for examples of comment update
 * @outputExample -- next comment block
 */

/* input
{
    "comment": "This space was very gross"
} 
*/

/* 
{
    "status": "success",
    "data": [
        {
            "_id": "6605ebed665b96d4f854b104",
            "review_id": 123,
            "space_id": 1,
            "email": "example@uic.edu",
            "comment": "This space was very gross",
            "amenities": {
                "has_outlets": true,
                "has_whiteboards": false,
                "has_screen": true,
                "is_food_beverage_friendly": true,
                "has_printer": false,
                "has_breakout_rooms": true,
                "restrooms": true,
                "seating_type": "Group Seating",
                "_id": "6605ebed665b96d4f854b105"
            },
            "statistics": {
                "noiseLevels": 4,
                "occupancy": 3.5,
                "connectivity": 5,
                "_id": "6605ebed665b96d4f854b106"
            },
            "createdAt": "2024-03-28T22:15:09.717Z",
            "updatedAt": "2024-04-14T22:40:55.363Z",
            "__v": 0
        }
    ],
    "message": "Review updated successfully!"
}
*/

export async function updateReview (req, res) {
    const { id } = req.params

    // will check to see if the id is valid
    // if (!mongoose.Types.ObjectId.isValid(id)){
    //     return res.status(404).json({error: "No such review"})
    // }
    
    //update the only the fields we need to update
    //
    const review = await Review.findOneAndUpdate({review_id: id}, {
        ...req.body
    }, {new: true}) // you can set this to false to return the old document instead

    if (!review){
        return res.status(404).json({error: "No such review"})
    }

    res.status(200).json({
        status: "success",
        data: [review],
        message: "Review updated successfully!"
    })
}
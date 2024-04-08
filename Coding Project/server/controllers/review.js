import mongoose from "mongoose"
import Review from "../models/Review.js"
import Mongoose from "mongoose"

// GET all reviews for all spaces
export async function getReviews (req,res) {
    const reviews = await Review.find({}).sort({createdAt: -1})
    res.status(200).json({
        status: "success",
        data: reviews,
        message: "All Reviews Recieved."})
}

// Get all reviews for a single space
export async function getSpaceReviews (req,res) {
    const { space_id } = req.params
    const reviews = await Review.find({space_id: space_id}).sort({createdAt: -1})
    res.status(200).json({
        status: "success",
        data: reviews,
        message: 'Reviews recieved successfully for space ${space_id}.'}})
}

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
        message: "Review Found."}})
}

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
            Overall_Connectivity: average_connect
            message: "Review Statistics Calculated Successfully"
         });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

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
    }})
}
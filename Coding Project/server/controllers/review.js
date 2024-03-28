import mongoose from "mongoose"
import Review from "../models/Review.js"
import Mongoose from "mongoose"

// GET all reviews
export async function getReviews (req,res) {
    const reviews = await Review.find({}).sort({createdAt: -1})
    res.status(200).json(reviews)
}

// GET a single review
export async function getReview (req, res) {
    const { id } = req.params

    // will check to see if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such review"})
    }
    
    const review = await Review.findById(id)
    if (!review){
        return res.status(404).json({error: "No such review"})
    }

    res.status(200).json(review)
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
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such review"})
    }
    
    const review = await Review.findOneAndDelete({_id: id})
    if (!review){
        return res.status(404).json({error: "No such review"})
    }

    res.status(200).json(review)
}

export async function updateReview (req, res) {
    const { id } = req.params

    // will check to see if the id is valid
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such review"})
    }
    
    //update the only the fields we need to update
    const review = await Review.findOneAndUpdate({_id: id}, {
        ...req.body
    }, {new: true}) // you can set this to false to return the old document instead

    if (!review){
        return res.status(404).json({error: "No such review"})
    }

    res.status(200).json(review)
}
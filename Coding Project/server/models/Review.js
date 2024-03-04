import mongoose from "mongoose"

// TODO: not tested, preliminary

const ReviewSchema = new mongoose.Schema(
    {
        review_id: Number,
        space_id: Number,
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        comment: {
            type: String,
        },
    },
    {timestamps: true}
);

export default mongoose.model("review", ReviewSchema)
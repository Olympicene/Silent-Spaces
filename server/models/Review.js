import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema(
    {
        review_id: Number,
        space_id: Number,
        username: {
            type: String,
            lowercase: true,
            trim: true,
        },
        comment: {
            type: String,
        },
        amenities: {
            type: {
                has_outlets: {
                    type: Boolean
                },
                has_whiteboards: {
                    type: Boolean
                },
                has_screen: {
                    type: Boolean
                },
                is_food_beverage_friendly: {
                    type: Boolean 
                },
                has_printer: {
                    type: Boolean
                },
                has_breakout_rooms: {
                    type: Boolean
                },
                restrooms: {
                    type: Boolean
                },
                seating_type: {
                    type: String,
                    enum: ["Group Seating", "Individual Seating"]
                }
            },
        },
        statistics: {
            type: {
                noiseLevels: {
                    type: Number,
                    enum: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5,3.0, 3.5, 4.0, 4.5, 5.0]
                },
                occupancy: {
                    type: Number,
                    enum: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5,3.0, 3.5, 4.0, 4.5, 5.0]
                },
                connectivity: {
                    type: Number,
                    enum: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5,3.0, 3.5, 4.0, 4.5, 5.0]
                }
            }
        },
    },
    {timestamps: true}
    
);

export default mongoose.model("Review", ReviewSchema)
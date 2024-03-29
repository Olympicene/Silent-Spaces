import mongoose from "mongoose"

const SpaceSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: "An ID is required",
            max: 25,
            unique: true
        },
        name: {
            type: String,
            required: "Space Name is required",
            max: 25,
        },
        img: {
            type: String,
        },
        desc: {
            type: String,
            required: "Description is requried",
        },
        location: {
            type: {
                type: String,
                default: 'Point',
            },
            coordinates: [Number],
        },
        address: {
            type: String,
            required: "Address is required",
        },
        rating: {
            type: Number
        },
        statistics: {
            type: {
                noiseLevels: {
                    type: Number,
                    enum: [0, 0.5, 1, 1.5, 2, 2.5,3, 3.5, 4, 4.5, 5]
                },
                occupancy: {
                    type: Number,
                    enum: [0, 0.5, 1, 1.5, 2, 2.5,3, 3.5, 4, 4.5, 5]
                },
                connectivity: {
                    type: Number,
                    enum: [0, 0.5, 1, 1.5, 2, 2.5,3, 3.5, 4, 4.5, 5]
                }
            }
        },
        reviews: {
            type: Array,
            default: []
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
        }

    },
    {timestamps: true}
);

export default mongoose.model("Space", SpaceSchema)
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
            type: Array,
            default: []
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
        reviews: {
            type: Array,
            default: []
        },
        tags:{
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
                    enum: ["group-seating", "individual-seating"]
                }
            },
        }

    },
    {timestamps: true}
);

export default mongoose.model("Space", SpaceSchema)
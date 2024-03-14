import mongoose from "mongoose"
import bcrypt from "bcrypt"

import jwt from 'jsonwebtoken'
import { SECRET_ACCESS_TOKEN } from '../config/index.js'

const SpaceSchema = new mongoose.Schema(
    {
        id: {
            type: int,
            required: "An ID is required",
            max: 25,
            unique: true
        },

        name: {
            type: String,
            required: "Space Name is required",
            max: 25,
        },
        desc: {
            type: String,
            required: "Description is requried",
        },
        coords: {
            type: {
                lat: {
                    type: Number, 
                    required: "The Latitude is required"
                },
                lon: {
                    type: Number, 
                    required: "The Longitude is required"
                }
            },
            required: "Space Coordinate is required",
            max: 25,
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
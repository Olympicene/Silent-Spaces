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
                    enum: [1,2,3,4,5]
                },
                occupancy: {
                    type: Number,
                    enum: [1,2,3,4,5]
                },
                occupancy: {
                    type: Number,
                    enum: [1,2,3,4,5]
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
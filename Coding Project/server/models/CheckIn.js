import mongoose from "mongoose"

const CheckInSchema = new mongoose.Schema (
    {
        id: {
            type: Number
        },
        space_id: {
            type: Number
        },
        username: {
            type: String,
        },
        noiseLevels: {
            type: Number,
        },
        occupancy: {
            type: Number,
        },
        connectivity: {
            type: Number,
        }
    },
    { timestamps: true}
)

export default mongoose.model("checkin", CheckInSchema)
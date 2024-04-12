import mongoose from "mongoose"

const CheckInSchema = new mongoose.Schema (
    {
        noiseLevels: {
            type: Number,
            min: [0, "you can not give a negative review"],
            max: [5, "you can not give a review greater than 5"]
        },
        occupancy: {
            type: Number,
            min: [0, "you can not give a negative review"],
            max: [5, "you can not give a review greater than 5"]
        },
        connectivity: {
            type: Number,
            min: [0, "you can not give a negative review"],
            max: [5, "you can not give a review greater than 5"]
        }
    },
    { timestamps: true}
)

export default mongoose.model("checkin", CheckInSchema)
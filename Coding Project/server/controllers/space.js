import Space from "../models/Space.js"

// get all user

//get a single user

// create new user
export async function createSpace (req, res) {

    try {
        const {id, name, desc, coords, address, rating, statistics, reviews, amenities} = req.body

        // create new user
        const newSpace = new Space({
            id,
            name,
            desc,
            coords,
            address,
            rating,
            statistics,
            reviews,
            amenities
        });

        // check if that id already exists
        const existingSpace = await Space.findOne({ id });
        if (existingSpace) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems that space already exists, try updating instead.",    
            })
        }

        const savedUser = await newSpace.save();
        const {...space_data } = newSpace._doc;
        res.status(200).json({
            status: "success",
            data: [space_data],
            message: "Thank you for registering with us. Your space has been successfully created."
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

// delete a user

// update a user
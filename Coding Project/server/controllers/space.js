import Space from "../models/Space.js"

/**
 * @route GET /space/all-spaces
 * @desc Fetch all spaces summaries listed in the database
 * @access Public
 */
export async function AllSpacesSummary(req, res) {
    try {
        const spacesArray = await Space.find({}, {id:1, name:1, coords:1, rating:1});

        res.status(200).json({
            status: "success",
            data: [spacesArray],
            message: "Spaces fetched successfully!"
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ 
            status: 'err',
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

/**
 * @route GET /space/:id
 * @desc Get full information of a space given its ID
 * @access Public
 */
export async function FullSpaceInfo(req, res) {
    try {
        var queryid = req.params.id;
        const spaceInfo = await Space.find({id: queryid}, {});

        res.status(200).json({
            status: "success",
            data: spaceInfo,
            message: "Space full information fetched successfully!"
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({ 
            status: 'err',
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

/**
 * @route POST /space/add-space-basic
 * @desc Adds a basic space (id, name, desc, coords, address) -- Emily's using this one 
 * @access Public
 */
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
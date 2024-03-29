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
 * @route GET /space/space-info/:id
 * @desc Get full information of a space given its ID
 * @access Public
 */
export async function FullSpaceInfo(req, res) {
    try {
        // TODO change logic to extract ID field and find all the info from that space
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
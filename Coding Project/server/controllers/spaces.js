import Space from "../models/Space.js"

/**
 * @route GET /space/all-spaces-summary
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

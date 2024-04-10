import Space from "../models/Space.js";
import User from "../models/User.js";

/**
 * @route GET /user/fav-space/all
 * @desc Fetch space summaries for user's favorite spaces
 * @access Public
 */
export async function GetFavoriteSpaces(req, res) {
    try {
        /*queryname = req.user.username;

        const favIDs = await User.find({username: queryname}, {favorite_spaces:1});

        const spacesArray = await Space.find({}, {id:1, name:1, img:1, coords:1, rating:1});
        */
        res.status(200).json({
            status: "success",
            data: "get all favorite spaces",
            message: "Favorite spaces fetched successfully!"
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
export async function AddFavoriteSpace(req, res) {
    try {
        /*var queryid = req.params.id;
        const spaceInfo = await Space.find({id: queryid}, {});
        */
        res.status(200).json({
            status: "success",
            data: "add new favorite space",
            message: "Added new favorite space successfully!"
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

// delete a space
export async function DeleteFavoriteSpace(req, res) {
    try {
        
        //var queryid = req.params.id;
        //const spaceInfo = await Space.find({id: queryid}, {});

        res.status(200).json({
            status: "success",
            data: "delete favorite space",
            message: "Deleted favorite space successfully!"
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
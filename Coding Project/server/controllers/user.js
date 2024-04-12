import Space from "../models/Space.js";
import User from "../models/User.js";

/**
 * @route GET /user/fav-space/all
 * @desc Fetch space summaries for user's favorite spaces
 * @access Public
 * 
 * @input user is logged in
 * @inputExample  -- GET http://localhost:5005/user/fav-space/all
 * @outputExample -- next comment block
 */
/*
{
    "status": "success",
    "data": [
        {
            "_id": "65f37ad4f16cf8c61893d072",
            "id": 0,
            "name": "WiCS Lounge",
            "img": "https://today.uic.edu/wp-content/uploads/2020/01/CS-Lounge-WiCS_6x4.jpg",
            "rating": 4
        },
        {
            "_id": "6606db4928c41e053b834b25",
            "id": 5,
            "name": "UIC Academic and Residential Complex",
            "img": "https://bestinamericanliving.com/wp-content/uploads/awards/2020/2020-9302/09arcatuicdaveburk-2000x1192.jpg",
            "rating": 3.7
        },
    ],
    "message": "Favorite spaces fetched successfully!"
}
*/
export async function GetFavoriteSpaces(req, res) {
    try {
        const queryname = req.user.username; // get username
        const favSpaces = await User.find({username: queryname}, {favorite_spaces:1, _id:0}); // find user's fav spaces

        // clean array
        const idArray = [];
        favSpaces[0].favorite_spaces.forEach(function(obj) {
            idArray.push(obj.space_id);
        });
        
        // get space summaries of spaces in idArray
        const spacesArray = await Space.find({id: {$in: idArray}}, {id:1, name:1, img:1, coords:1, rating:1});

        res.status(200).json({
            status: "success",
            data: spacesArray,
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
 * @route POST /user/fav-space/add/:id
 * @desc Add a specific space_id to a user's favorite_spaces list
 * @access Public
 * 
 * @input :id - space to add in path parameters
 *        user is logged in
 * @inputExample  -- POST http://localhost:5005/user/fav-space/add/2
 * @outputExample -- next comment block
 */
/*
{
    "status": "success",
    "data": "2",
    "message": "Added new favorite space successfully! Appended space_id from 'data' field."
}
*/
export async function AddFavoriteSpace(req, res) {
    try {
        const queryname = req.user.username; // get username
        const queryid = req.params.id; // new favorite space's id
        const newUser = await User.findOneAndUpdate(
            {username: queryname}, 
            {$push: { favorite_spaces: {space_id: queryid} }},
            {new: true}
        );
    
        res.status(200).json({
            status: "success",
            data: queryid,
            message: "Added new favorite space successfully! Appended space_id from 'data' field."
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
 * @route DELETE /user/fav-space/del/:id
 * @desc Delete a specific space_id from a user's favorite_spaces list
 * @access Public
 * 
 * @input :id - space to delete in path parameters
 *        user is logged in
 * @inputExample  -- DELETE http://localhost:5005/user/fav-space/del/2
 * @outputExample -- next comment block
 */
/*
{
    "status": "success",
    "data": "2",
    "message": "Deleted favorite space successfully! Removed space_id from 'data' field"
}
*/
export async function DeleteFavoriteSpace(req, res) {
    try {
        const queryname = req.user.username; // get username
        const queryid = req.params.id; // to be deleted favorite space's id
        const newUser = await User.findOneAndUpdate(
            {username: queryname}, 
            {$pull: { favorite_spaces: {space_id: queryid} }},
            {new: true}
        );

        res.status(200).json({
            status: "success",
            data: queryid,
            message: "Deleted favorite space successfully! (if it existed in the user's favorite_spaces array)"
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
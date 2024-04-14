import User from "../models/User.js"

//inital structure for get functions
// export async function getUsers (req,res) {
//     const user = await User.find({}).sort({createdAt: -1})
//     res.status(200).json(workouts)
// }

/**
 * @route POST v1/auth/register
 * @desc Resisters a user
 * @access Public
 */

export async function Register(req, res) {
    try {
        const {username, first_name, last_name, email, password} = req.body

        // create new user
        const newUser = new User({
            username: username,
            first_name: first_name, 
            last_name: last_name, 
            email: email, 
            password: password,
            favorite_spaces: [],
            user_reviews: []
        });

        // check if exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",    
            });
        }


        const savedUser = await newUser.save();
        const {role, ...user_data } = savedUser._doc;
        res.status(200).json({
            status: "success",
            data: [user_data],
            message: "Thank you for registering with us. Your account has been successfully created."
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }
}

import bcrypt from "bcrypt";

/**
 * @router POST v1/auth/login
 * @desc logs in a user
 * @access Public
 */

export async function Login(req, res) {

    try {
        const { email } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if(!user) {
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentails."
            })
        }

        const isPasswordValid = await bcrypt.compare(
            `${req.body.password}`, 
            user.password
        )

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "failed",
                data: [],
                message:
                    "Invalid email or password. Please try again with the correct credentails."
            })
        }

        let options = {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }

        const token = user.generateAccessJWT();
        res.cookie("SessionID", token, options)
        res.status(200).json({
            status: "success",
            message: "You have successfully logged in.",
            recieved: user
        })

        // intial bench for login
        // const { password, ...user_data } = user._doc;

        // res.status(200).json({
        //     status: "success",
        //     data: [user_data],
        //     message: "You have successfullly logged in."
        // })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "err",
            code: 500,
            data: [],
            message: "Internal Server Error",
        })
    }

    res.end()

    // END POINT: if you want any user information it is stored in the user variable
}

import Blacklist from "../models/Blacklist.js";
/**
 * @route POST /auth/logout
 * @desc Logout user
 * @access Public
 */
export async function Logout(req, res) {
    try {

        console.log("got here")
        const authHeader = req.headers['cookie']

        if (!authHeader) {
            return res.status(204)
        }

        const cookie = authHeader.split('=')[1]
        const accessToken = cookie.split(';')[0]

        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken })

        if (checkIfBlacklisted) {
            return res.status(204) 
        }

        const newBlacklist = new Blacklist({
            token: accessToken,
        })

        await newBlacklist.save();

        res.clearCookie('SessionID', { httpOnly: true });
        res.status(200).json({ message: 'You are logged out!' });

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
 * @router GET v1/auth/<user>/info
 * @desc gets all information regarding the user
 * @access Public
 * 
 * @input : id - username of the person you want to search for
 *         user is logged in
 * @inputExample -- GET http://localhost:5005/v1/auth/emend1/info
 * @outputExample -- next comment block
 * 
 */
/**
 * {
    "_id": "66055c0e84cc0c2072f1b2ca",
    "username": "emend1",
    "first_name": "emily",
    "last_name": "Mendoza",
    "email": "emend1@uic.edu",
    "role": "Student",
    "favorite_spaces": [
        {
            "space_id": 1,
            "_id": "6606280f2adc8c8f94440afd"
        },
        {
            "space_id": 2,
            "_id": "6606280f2adc8c8f94440afe"
        }
    ],
    "user_reviews": [],
    "createdAt": "2024-03-28T12:01:18.695Z",
    "updatedAt": "2024-03-29T02:31:43.208Z",
    "__v": 0
}
 * 
 */

export async function getUser (req, res){
    const { id } = req.params

    const user = await User.findOne({username: id})
    if (!user){
        return res.status(404).json({error: "No such user"})
    }

    res.status(200).json(user)

}

/**
 * 
 * @route PATCH /v1/auth/<username>/update
 * @desc Update information to the user 
 * @access Public
 * 
 * @input : id - username of user you want to update
 *          user is logged in
 * 
 * @inputExample -- GET http://localhost:5005/v1/auth/emend1/update
 * @outputExample -- next comment block
 */
/**
 * 
 * {
    "_id": "66055c0e84cc0c2072f1b2ca",
    "username": "emend1",
    "first_name": "emily",
    "last_name": "Mendoza",
    "email": "emend1@uic.edu",
    "role": "Student",
    "favorite_spaces": [
        {
            "space_id": 1,
            "_id": "661c4311fc60b3c6f0c1a39a"
        },
        {
            "space_id": 2,
            "_id": "661c4311fc60b3c6f0c1a39b"
        }
    ],
    "user_reviews": [],
    "createdAt": "2024-03-28T12:01:18.695Z",
    "updatedAt": "2024-04-14T20:56:49.128Z",
    "__v": 0
}
 */

export async function updateUser (req, res) {
    const { id } = req.params

    const user = await User.findOneAndUpdate({username: id}, {
        ...req.body
    }, {new: true}) // you can set this to false to return the old document instead

    if (!user){
        return res.status(404).json({error: "No such review"})
    }

    res.status(200).json(user)
}
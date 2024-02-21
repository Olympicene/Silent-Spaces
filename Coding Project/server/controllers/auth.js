import User from "../models/User.js"

/**
 * @route POST v1/auth/register
 * @desc Resisters a user
 * @access Public
 */

export async function Register(req, res) {
    try {
        const { first_name, last_name, email, password } = req.body

        // create new user
        const newUser = new User({
            first_name,
            last_name,
            email,
            password,
        });

        // check if exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",    
            });

        const savedUser = await newUser.save();
        const { role, ...user_data } = savedUser._doc;
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

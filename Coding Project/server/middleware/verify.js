import User from "../models/User.js"
import jwt from "jsonwebtoken"
import { SECRET_ACCESS_TOKEN } from '../config/index.js'


export async function Verify(req, res, next) {
    try {
        const authHeader = req.headers["cookie"]

        if (!authHeader) return res.sendStatus(401); // no cookie
        const cookie = authHeader.split("=")[1]; // get cookie, prolly better way

        jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: "This session has expired. Please login" });
            }

            const { id } = decoded
            const user = await User.findById(id)
            const { password, ...data } = user._doc;
            req.user = data;
            next();
        })


    
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "error",
            code: 500,
            data: [],
            message: "Internal Server Error"
        })
    }
}
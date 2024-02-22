import express from "express"
import { Register, Login } from "../controllers/auth.js"
import Validate from "../middleware/validate.js"
import { check } from "express-validator"
import { Logout } from "../controllers/auth.js"
const router = express.Router();

router.post(
    "/register",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("first_name")
        .not()
        .isEmpty()
        .withMessage("Your first name is required")
        .trim()
        .escape(),
    check("last_name")
        .not()
        .isEmpty()
        .withMessage("Your last name is required")
        .trim()
        .escape(),
    check("password")
        .notEmpty()
        .isLength({min: 8})
        .withMessage("Must be at least 8 chars long"),
    Validate,
    Register
)

router.post(
    "/login",
    check("email")
        .isEmail()
        .withMessage("Enter a valid email address")
        .normalizeEmail(),
    check("password").not().isEmpty(),
    Validate,
    Login
)

router.get('/logout', Logout);

export { router }
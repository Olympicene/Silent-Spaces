import express from "express"
import { Register, Login, getUser, updateUser} from "../controllers/auth.js"
import Validate from "../middleware/validate.js"
import { check } from "express-validator"
import { Logout } from "../controllers/auth.js"
const router = express.Router();

router.post(
    "/register",
    check("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .normalizeEmail(),
    check("username")
        .notEmpty()
        .withMessage("Please enter a username")
        .trim()
        .escape(),
    check("first_name")
        .notEmpty()
        .withMessage("Your first name is required")
        .trim()
        .escape(),
    check("last_name")
        .notEmpty()
        .withMessage("Your last name is required")
        .trim()
        .escape(),
    check("password")
        .isLength({min: 8})
        .withMessage("Password must be at least 8 chars long")
        .notEmpty()
        .withMessage("Password cannot be empty"),
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

router.get('/:id/info', Validate, getUser);

router.patch('/:id/update/', Validate, updateUser);

export { router }
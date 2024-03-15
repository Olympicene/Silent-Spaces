import express from "express"
import Validate from "../middleware/validate.js"
import { check } from "express-validator"
import { AddSpaceBasic } from "../controllers/admin.js";

var router = express.Router();

/* POST space info */
router.post(
    "/add-space-basic",
    check("id")
        .notEmpty()
        .withMessage("Enter space id"),
    check("name")
        .notEmpty()
        .withMessage("Enter space name"),
    check("desc")
        .notEmpty()
        .withMessage("Enter space description"),
    check("lat")
        .notEmpty()
        .withMessage("Enter space latitude"),
    check("lon")
        .notEmpty()
        .withMessage("Enter space longitude"),
    check("address")
        .notEmpty()
        .withMessage("Enter space address"),
    Validate,
    AddSpaceBasic
)

export { router }

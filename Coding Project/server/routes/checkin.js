import express from "express"
import Validate from "../middleware/validate.js"
import { getCheckin, getCheckinbySpace, getRecentCheckin, postCheckin } from "../controllers/checkin.js";
import { Verify } from "../middleware/verify.js";

var router = express.Router();

//GET all checkin
router.get('/', Verify, getCheckin)

//GET checkins from single space
router.get('/:id', Verify, getCheckinbySpace)

//GET first 15 minutes of single space
router.get('/live/:id', Verify, getRecentCheckin)

//POST new checkin
router.post('/', Validate, postCheckin)

export { router }
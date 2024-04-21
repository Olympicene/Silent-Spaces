import express from "express"
import Validate from "../middleware/validate.js"
import { getCheckin, getCheckinbySpace, getRecentCheckin, postCheckin } from "../controllers/checkin.js";

var router = express.Router();

//GET all checkin
router.get('/', Validate, getCheckin)

//GET checkins from single space
router.get('/:id', Validate, getCheckinbySpace)

//GET first 15 minutes of single space
router.get('/live/:id', Validate, getRecentCheckin)

//POST new checkin
router.post('/', Validate, postCheckin)

export { router }
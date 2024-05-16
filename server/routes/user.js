import express from "express"
import User from "../models/User.js"
import { Verify } from "../middleware/verify.js";
import Validate from "../middleware/validate.js"
import { GetFavoriteSpaces, GetFavoriteIds, AddFavoriteSpace, DeleteFavoriteSpace } from "../controllers/user.js";

var router = express.Router();

// ---- BASIC USER QUERIES ---- //

// todo: insert things like getuserinfo and stuff here

// ---- USER'S FAVORITE SPACE QUERIES ---- //

/* GET favorite spaces from current user */
router.get(
    '/fav-space/all',
    Verify, 
    GetFavoriteSpaces,
);

/* GET favorite spaces IDS only from current user */
router.get(
    '/fav-space/ids',
    Verify, 
    GetFavoriteIds,
);

/* POST new favorite space for current user*/
router.post(
    '/fav-space/add/:id',
    Verify, 
    AddFavoriteSpace,
);

/* DELETE favorite space from current user*/
router.delete(
    '/fav-space/del/:id',
    Verify, 
    DeleteFavoriteSpace,
);

export { router }

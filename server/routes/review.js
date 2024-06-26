import express from "express"
import { check } from "express-validator"
import { Verify } from "../middleware/verify.js";
import Review from "../models/Review.js"
import Validate from "../middleware/validate.js"
import { postReview, getReviews, getSpaceReviews, getSpaceAverages, getReview, deleteReview, updateReview} from "../controllers/review.js";


// router we will be using to handle get and post requests
var router = express.Router();

// general format for a get request 
// router.get('/', () => {})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// GET all reviews
router.get('/', Verify, getReviews);

//GET a single review
// we can use the :id for route parameters, it can change
router.get('/:id', Verify, getReview);

//gets all the reviews that share the same space id.
router.get('/:space_id/all', Verify, getSpaceReviews);

//gets all the reviews that share the same space id.
router.get('/:space_id/score', Verify, getSpaceAverages);

//POST a new review
router.post('/', Validate, postReview)

// Delete a review
router.delete('/:id', Verify, deleteReview)

// Update a review
router.patch('/update/:id', Validate, updateReview)

/* POST new Favorite Space on the list*/
/*router.post(
  '/add-favorite-space',
  Verify,
  AddFavoriteSpace,
);*/

export { router }

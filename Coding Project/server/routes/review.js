import express from "express"
import { check } from "express-validator"
import { Verify } from "../middleware/verify.js";
import Review from "../models/Review.js" 
import { postReview, getReviews, getReview, deleteReview, updateReview} from "../controllers/review.js";


// router we will be using to handle get and post requests
var router = express.Router();

// general format for a get request 
// router.get('/', () => {})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// GET all reviews
router.get('/', getReviews);

//GET a single review
// we can use the :id for route parameters, it can change
router.get('/:id', getReview);

//POST a new review
router.post('/', postReview)

// Delete a review
router.delete('/:id', deleteReview)

// Update a review
router.patch('/:id', updateReview)

/* POST new Favorite Space on the list*/
/*router.post(
  '/add-favorite-space',
  Verify,
  AddFavoriteSpace,
);*/

export { router }

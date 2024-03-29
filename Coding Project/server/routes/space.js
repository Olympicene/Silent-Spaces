import express from "express"
import { check } from "express-validator"
import { Verify } from "../middleware/verify.js";
import Space from "../models/Space.js" 
import Validate from "../middleware/validate.js"
import {  AllSpacesSummary, FullSpaceInfo, filterByAmenities, SortedByProximity, createSpace, deleteSpace, updateSpace, filterByRatings, filterByNoise, filterByOccupancy, filterByConnectivity, sortByLetter} from "../controllers/space.js";


// router we will be using to handle get and post requests
var router = express.Router();

// general format for a get request 
// router.get('/', () => {})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET all spaces */
router.get(
  '/all-spaces',
  Verify, 
  AllSpacesSummary,
);

/* GET a specific space given ID */
router.get(
  '/space-info/:id',
  Verify, 
  FullSpaceInfo,
);

/* GET all spaces sorted by proximity from the user */
router.get(
  '/sort',
  Verify, 
  SortedByProximity,
);


// GET a list of spaces based on ratings
router.get('/overall-ratings/sort', Validate, filterByRatings)
router.get('/noise-ratings/sort', Validate, filterByNoise)
router.get('/occupancy-ratings/sort', Validate, filterByOccupancy)
router.get('/connectivity-ratings/sort', Validate, filterByConnectivity)

// GET a list of spaces based on alphabetical order
router.get('/alphabetical-order/sort', Validate, sortByLetter)

// GET a list of spaces based on amenities
router.get('/amenities/sort', Validate, filterByAmenities)

// GET a list of spaces based on distance
// TODO: Annie You

//POST a new space
router.post('/', Validate, createSpace)

// Delete a space
router.delete('/:id', Validate, deleteSpace)

// Update a space
router.patch('/:id', Validate, updateSpace)

/* POST new Favorite Space on the list*/
/*router.post(
  '/add-favorite-space',
  Verify,
  AddFavoriteSpace,
);*/

export { router }

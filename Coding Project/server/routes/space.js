import express from "express"
import { check } from "express-validator"
import { Verify } from "../middleware/verify.js";
import Space from "../models/Space.js" 
import Validate from "../middleware/validate.js"
import {  AllSpacesSummary, FullSpaceInfo,
          sortByRatings, sortByNoise, sortByOccupancy, sortByConnectivity,
          sortByLetter, sortByProximity,
          filterByAmenities, 
          createSpace, deleteSpace, updateSpace} from "../controllers/space.js";

// router we will be using to handle get and post requests
var router = express.Router();

// general format for a get request 
// router.get('/', () => {})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// ---- BASIC SPACE QUERIES ---- //

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

// ---- SORT SPACE QUERIES ---- //

// GET a list of spaces based on ratings
router.get('/sort/overall-ratings', Verify, sortByRatings)
router.get('/sort/noise-ratings', Verify, sortByNoise)
router.get('/sort/occupancy-ratings', Verify, sortByOccupancy)
router.get('/sort/connectivity-ratings', Verify, sortByConnectivity)

// GET a list of spaces based on alphabetical order
router.get('/sort/alphabetical-order', Verify, sortByLetter)

// GET all spaces sorted by distance/proximity from the user
router.get('/sort/proximity', Verify,  sortByProximity)

// ---- FILTER SPACE QUERIES ---- //

// GET a list of spaces based on amenities
router.get('/filter/amenities', Verify, filterByAmenities)

// ---- ADMIN QUERIES ---- //
//POST a new space
router.post('/', Verify, createSpace)

// Delete a space
router.delete('/:id', Verify, deleteSpace)

// Update a space
router.patch('/:id', Verify, updateSpace)

export { router }

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

//POST a new space
router.post('/', Verify, createSpace)

// Delete a space
router.delete('/:id', Verify, deleteSpace)

// Update a space
router.patch('/:id', Verify, updateSpace)

// TODO: fix the routes and agree on a standard

// ---- SORT SPACE QUERIES ---- //

// GET a list of spaces based on ratings
router.get('/overall-ratings/sort', Verify, filterByRatings)
router.get('/noise-ratings/sort', Verify, filterByNoise)
router.get('/occupancy-ratings/sort', Verify, filterByOccupancy)
router.get('/connectivity-ratings/sort', Verify, filterByConnectivity)

// GET a list of spaces based on alphabetical order
router.get('/alphabetical-order/sort', Verify, sortByLetter)

// GET a list of spaces based on amenities
router.get('/amenities/sort', Verify, filterByAmenities)

/* GET all spaces sorted by distance/proximity from the user */
router.get(
  '/sort',
  Verify, 
  SortedByProximity,
);

// ---- FILTER SPACE QUERIES ---- //


export { router }

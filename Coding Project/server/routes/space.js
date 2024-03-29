import express from "express"
import { check } from "express-validator"
import { Verify } from "../middleware/verify.js";
import Space from "../models/Space.js" 
import {  AllSpacesSummary, FullSpaceInfo, createSpace } from "../controllers/space.js";


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
// TODO extract ID field from url?
router.get(
  '/space-info/:id',
  Verify, 
  FullSpaceInfo,
);

//POST a new space
router.post('/', createSpace)

// Delete a space
router.delete('/:id', (req, res) => {
  res.json({mssg: "DELETE a user"})
})

// Update a space
router.patch('/:id', (req, res) => {
  res.json({mssg: "UPDATE a user"})
})

/* POST new Favorite Space on the list*/
/*router.post(
  '/add-favorite-space',
  Verify,
  AddFavoriteSpace,
);*/

export { router }

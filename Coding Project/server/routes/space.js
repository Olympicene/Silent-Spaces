import express from "express"
import { check } from "express-validator"
import { Verify } from "../middleware/verify.js";
import Space from "../models/Space.js" 
import { createSpace } from "../controllers/space.js";


// router we will be using to handle get and post requests
var router = express.Router();

// general format for a get request 
// router.get('/', () => {})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


// GET all spaces
router.get('/', (req, res) => {
  res.json({mssg: 'GET all users'});
});

//GET a single space
// we can use the :id for route parameters, it can change
router.get('/:id', (req, res) => {
  res.json({mssg: 'GET a single users'});
});

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

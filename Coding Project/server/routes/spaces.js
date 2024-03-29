import express from "express"
import { Verify } from "../middleware/verify.js";
import { AllSpacesSummary, FullSpaceInfo } from "../controllers/spaces.js"

var router = express.Router();

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

export { router }

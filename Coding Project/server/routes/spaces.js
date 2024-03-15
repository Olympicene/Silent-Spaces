import express from "express"
import { Verify } from "../middleware/verify.js";
import { AllSpacesSummary } from "../controllers/spaces.js"

var router = express.Router();

/* GET all spaces */
router.get(
  '/all-spaces',
  Verify, 
  AllSpacesSummary,
);

export { router }

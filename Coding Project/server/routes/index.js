import express from "express"
import { Verify } from "../middleware/verify.js";

var router = express.Router();


/* GET home page. */
router.get('/v1', (req, res) => {
  try {
    // res.render('index', { title: 'Express' });
    res.status(200).json({
      status: "success",
      data: [],
      message: "Welcome to our API homepage!",
    })

  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    })
  }
});

router.get('/v1/user', Verify, (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to your Dashboard!",
  })
})

export { router }

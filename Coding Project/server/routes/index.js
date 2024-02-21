import express from "express"
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

export { router }

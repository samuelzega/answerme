var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/", room.createOne)
router.get("/", room.getAll)
router.delete("/:id", room.deleteOne)
module.exports = router;

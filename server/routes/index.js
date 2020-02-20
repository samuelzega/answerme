var express = require('express');
var router = express.Router();
const ApiQuizController = require('../controllers/apiquiz')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/quiz', ApiQuizController.apiquiz)

module.exports = router;

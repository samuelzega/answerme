var express = require('express')
var router = express.Router()
const ApiQuizController = require('../controllers/apiquiz')
const room = require('../controllers/rooms')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})
router.post('/rooms', room.createOne)
router.get('/rooms', room.getAll)
router.delete('/rooms:id', room.deleteOne)
router.get('/quiz', ApiQuizController.apiquiz)
module.exports = router

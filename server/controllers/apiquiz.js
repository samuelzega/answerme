const axios = require('axios')

class ApiQuizController {
  static apiquiz(req, res, next) {
    axios({
        url: 'https://opentdb.com/api.php',
        method: 'GET',
        params: {
          amount: 3,
          category: 11,
          difficulty: 'easy',
          type: 'boolean'
        }
      })
    .then(({ data }) => {
        console.log(data.results)
        res.json(data.results)
    })
    .catch(error => {
        console.log(error)
    })
  }
}

module.exports = ApiQuizController

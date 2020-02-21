const axios = require('axios')

class ApiQuizController {
  static async apiquiz() {
    try {
      return await axios({
        url: 'https://opentdb.com/api.php',
        method: 'GET',
        params: {
          amount: 10,
          category: 11,
          difficulty: 'easy',
          type: 'boolean'
        }
      })
      console.log(data, 'ini data api')
      // return data.results
    } catch (error) {
      console.log(error)
    }
    // .then(({ data }) => {
    //     console.log(data.results)
    //     return data.results
    // })
    // .catch(error => {
    //     console.log(`ini error`)
    // })
  }
}

module.exports = ApiQuizController

const axios = require('axios')

class ApiQuizController {
    static apiquiz(req, res, next) {
        axios({
            url: 'https://opentdb.com/api.php',
            method: 'GET',
            params: {
                amount: 1,
                category: 11,
                difficulty: 'easy',
                type: 'boolean'
            }
        })
        .then(({ data }) => {
            res.status(200).json(data)
        })
        .catch(error => {
            console.log(error)
        })
    }
}

module.exports = ApiQuizController
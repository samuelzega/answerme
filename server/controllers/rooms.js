const { Room } = require("../models")

class RoomController {
    static getAll(req, res, next) {
        Room.findAll()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                res.status(404).json(err.message);
            });
    }
    static findOne(payload) {
        Room.findOne({
            where: {
                name: payload.name
            }
        })
            .then(result => {
                if (result !== null) {
                    return result
                }
            })
            .catch(error => {
                return { message: "room not found" }
            })
    }
    static createOne(payload) {
        let objInput = {
            name: payload.name,
            max_user: 4
        }
        Room.create(objInput)
            .then(result => {
                // console.log(result)
            })
            .catch(error => {
                // console.log(error)
            })
    }
    static deleteOne(req, res, next) {
        Room.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(result => {
                if (result === 0) {
                    res.status(404).json({ message: "data not found" });
                } else {
                    res.status(200).json(result);
                }
            })
            .catch(error => {
                console.log(error)
                res.status(400).json(error);
            });
    }
}
module.exports = RoomController
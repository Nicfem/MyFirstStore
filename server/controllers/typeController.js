const Types = require('../models/Types')

class typesController {
    async getAll (req, res) {
        try {
            const data = await Types.find()
            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async create(req, res) {
        try {
            console.log('RES')
            const {type} = req.body
            console.log(type)
            const newType = new Types({type: type})
            await newType.save()
            res.status(201).json(newType)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new typesController()
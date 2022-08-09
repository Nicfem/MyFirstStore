const Brand = require('../models/Brand')

class brandController {
    async get (req, res) {
        try {
            console.log(req.body)
            const data = await Brand.find()
            res.header('Access-Control-Allow-Origin', '*'),
            res.send(data)
        } catch (e) {
            console.log(e)
        }
    }

    async create(req, res) {
        try {
            console.log(req.body)
            const {brand} = req.body
            const newbrand = new Brand({brand: brand})
            await newbrand.save()
            res.status(201).json(newbrand)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new brandController()
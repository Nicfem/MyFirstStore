const {Schema, model} = require('mongoose')


const brand = new Schema({
    brand: {type: String, required: true}
})

module.exports = model('Brand', brand)
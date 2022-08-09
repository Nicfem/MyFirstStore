const {Schema, model} = require('mongoose')


const Discription = new Schema({
    title: {type: String}, 
    description:{type: String}
})

const product = new Schema({
    type: {type: String, required: true},
    brand: {type: String, required: true},
    device: {type: String, required: true},
    descriptions: [
        Discription
    ],
    price: {type: Number, required: true},
    img: {type: String}
})

module.exports = model('Product', product)
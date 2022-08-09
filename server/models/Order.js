const { ObjectId } = require('mongodb')
const {Schema, model} = require('mongoose')


const goods = new Schema ({
    _id: {type: String, required : true},
    quantity: {type: String, required : true},
    type : {type : String, required : true},
    device: {type: String, required : true},
    img: {type: String, required : true},
    price : {type : Number, required : true}
})


const order = new Schema({
    userId : {type: String},
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    paymentMethod : {type: String, required: true},
    date : {type: Date, default: Date.now},
    city : {type: String, required: true},
    deliveryMethod : {type: String, required : true},
    streetHouse : {type: String, required : true},
    apartment : {type : String, required : true},
    serviced : {type: Boolean, default : false},
    phone : {type : String, required: true},
    goods : [
        goods
    ],
})

module.exports = model('Orders', order)
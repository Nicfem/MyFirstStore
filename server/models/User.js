const {Schema, model} = require('mongoose')

const personalData = new Schema({
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    phone : {type: String, required: true},
    img: {type: String, default: null},
    paymentMethod : {type: String, default: 'Не выбран'},
    streetHouse : {type: String, default: 'Не выбран'},
    apartment : {type: String, default: 'Не выбран'},
    city : {type: String, default: 'Не выбран'},
    deliveryMethod : {type: String, default: 'Не выбран'},
})


const test = new Schema({
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    email: {type: String, unique: true, required: true},
    activationLink: {type: String, required: true},
    personalData : {type: Object(personalData)},
    role: [{type: String, ref: 'Role'}],
    purchaseHistory : [String],
    favoritesGoods: [],
    basket: []
})

module.exports = model('User', test)
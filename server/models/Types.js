const {Schema, model} = require('mongoose')


const types = new Schema({
    type: {type: String, required: true}
})

module.exports = model('Types', types)
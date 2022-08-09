const {Schema, model} = require('mongoose')


const Options = new Schema({
        value : {type: String}
})


const ProductOptions = new Schema({
    type: {type: String, required: true},
    descriptions : [
        {
            option_title : {type: String, required: true},
            option_value : [Options]
        }
    ]
})

module.exports = model('ProductOptions', ProductOptions)
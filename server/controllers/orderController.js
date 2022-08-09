const ApiError = require("../exceptions/api-error")
const Order = require("../models/Order")
const User = require("../models/User")



class orderController {
    async getAll(req, res, next) {
        try {
            const data = await Order.find({}, {goods : 0}).sort({$natural : -1})
            res.send(data)
        } catch(e) {
            next(e)
        }
    } 
    async getOne(req, res, next) {
        const {id} = req.params
        console.log(id)
        try {
            const data = await Order.findById(id)
            res.send(data)
        } catch(e) {
            next(e)
        }
    } 

    async confirmOrder(req, res, next) {
        const body = req.body
        try {
            delete body._id
            if(body.userId) {
                const user = await User.findById({_id : body.userId})
                if(!user) {
                    return next(ApiError.BadRequest("Пользователь не найден"))
                }
                const newOrder = await Order.create({...body})
                user.purchaseHistory.push(newOrder._id)
                user.basket = user.basket.filter(x => body.goods.includes(x))
                user.save()
                return res.json(newOrder)
            }
            const newOrder = await Order.create({...body})    
            res.json(newOrder)          
        } catch(e) {
            next(e)
        }
    } 

    async getAllWithGoods(req, res, next) {
        const {id} = req.params
        console.log(typeof id)
        try {
            const orders = await Order.find({userId: id}).sort({$natural: -1})

            res.send(orders)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new orderController()
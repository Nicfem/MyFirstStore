const Product = require("../models/Product")
const userService = require("../service/user-service")
const fs = require('fs')
const uuid = require('uuid')
const path = require('path')

class userController {
    async getOneUser(req, res, next) {
        const {id} = req.params
        try {
            let user = await userService.getOneUser(id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async updateUser(req, res, next) {
        const {id} = req.params
        
        const {User} = req.body
        let objUser = JSON.parse(User)
        const img = req.files?.file

        const pathImg = objUser.img
        delete objUser._id
        console.log(objUser.img)

        if(pathImg && img) {    
            fs.unlink(`./static${pathImg}`, (err) => console.log(err))
        }

        let fileName = uuid.v4() + '.jpg'

        if(img) {
            img.mv(path.resolve(__dirname, '..', 'static/userPhoto', fileName))
            fileName = `/userPhoto/${fileName}`
            objUser.img = fileName
        }

        try {
            const user = await userService.updateUser(id, {personalData : objUser})
            res.json(user)
        } catch (e) {
            next(e)
        }        
    }

    async addFavoriteGoods(req, res, next) {
        const {userId, goodsId} = req.body
        console.log(goodsId)
        
        try {
            let user = await userService.getOneUser(userId)

            if(!!user.favoritesGoods.filter(x => x == goodsId).length) {
                return res.json('error')
            }

            const goods = await Product.findById(goodsId)
            if(!goods) {
                return res.json('error Товар не найден')
            }
            
            user.favoritesGoods.push(goodsId)
            user.save()
            res.json('ok')
        } catch(e) {
            next(e)
        }
    }

    async deliteFavoriteGoods(req, res, next) {
        const {userId, goodsId} = req.body
        try {
            let user = await userService.getOneUser(userId)
            user.favoritesGoods = user.favoritesGoods.filter(x => x != goodsId)
            user.save()
            res.json('ok')
        } catch(e) {
            next(e)
        }
    }

    async AddToBasket(req, res, next) {
        const {userId, goodsId} = req.body
        try {
            let user = await userService.getOneUser(userId)
            if(!!user.basket.filter(x => x._id == goodsId).length) {
                return res.json('error')
            }
            const goods = await Product.findById(goodsId)
            if(!goods) return res.json('error Нет товара')
            user.basket.push(goodsId)
            user.save()
            res.json('ok')
        } catch(e) {
            next(e)
        }
    }

    async delitBasketGoods(req, res, next) {
        const {userId, goodsId} = req.body
        try {
            let user = await userService.getOneUser(userId)
            user.basket = user.basket.filter(x => x != goodsId)
            user.save()
            res.json('ok')
        } catch(e) {
            next(e)
        }
    }
}

module.exports = new userController()
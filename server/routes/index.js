const Router = require('express')
const router = Router()
const auth_router = require('./auth_router')
const device_router = require('./divice_router')
const brand_router = require('./brand_router')
const type_router = require('./type_router')
const user_router = require('./user_router')
const order_router = require('./order_router')

router.use('/auth', auth_router)
router.use('/Product', device_router)
router.use('/brand', brand_router) 
router.use('/types', type_router)
router.use('/user', user_router)
router.use('/orders', order_router)

module.exports = router
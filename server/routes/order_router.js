const Router = require('express')
const orderController = require('../controllers/orderController')
const router = Router()

router.get('/getAll', orderController.getAll)
router.get('/getOne/:id', orderController.getOne)
router.post('/confirmOrder', orderController.confirmOrder)
router.get('/getAllWithGoods/:id', orderController.getAllWithGoods)

module.exports = router
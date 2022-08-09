const {Router} = require('express')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const authMiddelware = require('../middlewares/auth-middelware')
const router = Router()

router.get('/info/:id', authMiddelware, userController.getOneUser)
router.post('/updateUser/:id', userController.updateUser)
router.put('/addFavorit',  userController.addFavoriteGoods)
router.put('/delFavorit', authMiddelware,  userController.deliteFavoriteGoods)
router.put('/AddToBasket', authMiddelware, userController.AddToBasket)
router.put('/delBasket', authMiddelware, userController.delitBasketGoods)
router.get('/refreshToken', authController.refresh)

module.exports = router
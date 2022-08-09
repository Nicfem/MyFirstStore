const Router = require('express')
const router = Router()
const brandController = require('../controllers/brandController')


router.get('/', brandController.get)
router.post('/', brandController.create)

module.exports = router
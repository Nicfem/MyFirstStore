const Router = require('express')
const router = Router()
const DeviceController = require('../controllers/deviceController')

router.post('/brand', DeviceController.create)
router.get('/brand', DeviceController.getAll)
router.get('/brand/option', DeviceController.getOption)
router.get('/brand/options', DeviceController.getOptionAll)
router.post('/brand/option', DeviceController.createOption)
router.put('/brand/option', DeviceController.updateOption)
router.get('/brand/deviceById', DeviceController.getAllDeviceById)
router.get('/brand/searchDevice/:device', DeviceController.getSearchDevice)
router.get('/brand/:id', DeviceController.getOne) 


module.exports = router
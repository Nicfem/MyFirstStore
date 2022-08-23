const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {check, validationResult, body}  = require('express-validator')
const User = require('../models/User')
const authController = require('../controllers/authController')
const authMiddelware = require('../middlewares/auth-middelware')


router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 12}),
    authController.registration)

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/activate/:link', authController.activate)
router.get('/refresh', authController.refresh)
router.get('/users', authMiddelware,  authController.getUsers)

module.exports = router
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
// router.get('/user/:id', authMiddelware, authController.getOneUser)
// router.put('/addFavorit/:id', authController.addFavoritesGoods)
router.post('/test', (req, res) => {
    res.cookie('dimas', 'value')
    res.json('21321')
})


// router.post(
//     '/register',
//     [
//         check('email', 'Некорректный email').isEmail(),
//         check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6})
//     ],
//     async (req, res) => {
//     try {
//         const errors = validationResult(req)
        

//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: 'Некоректные данные при регистации'
//             })
//         }

//         const {email, password} = req.body

//         const candidate = await User.findOne({email})


//         if (candidate) {
//             return res.status(400).json({message: 'Такой пользователь уже существует'})
//         }

//         // const pass = 322124

//         // const hashedPassword = await bcrypt.hash(pass, 3)
//         const hash = bcrypt.hashSync(password, 10)

//         // console.log(hashedPassword)
        
        
//         // console.log(passhashedPasswordword)

//         // const pas = hashedPassword

//         // console.log(pas)


//         const user = new User({email: email, password: hash})

        
//         await user.save()
        
//         res.status(201).json({message: 'Пользователь создан'})

//     } catch (e) {
//         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
//     }
// })

// router.post(
//     '/login',
//     [
//         check('email', 'Введите корректный email').normalizeEmail().isEmail(),
//         check('password', 'Введите пароль').exists()
//     ],
//     async (req, res) => {
//     try {
//         const errors = validationResult(req)

//         if (!errors.isEmpty()) {
//             return res.status(400).json({
//                 errors: errors.array(),
//                 message: 'Некоректные данные при входу в систему'
//             })
//         }

//         const {email, password} = req.body

//         const user = await User.findOne({email})

//         if (!user) {
//             return res.status(400).json({message: 'Пользователь не найден'})
//         }

//         // const isMatch = await bcrypt.compare(password, user.password)
//         const isMatch = bcrypt.compareSync(password, user.password)
//         // password != user.password
//         if (!isMatch) {
//             return res.status(400).json({message: 'Неверный пароль, попробуйе снова'})
//         }

//         // const token = jwt.sign(
//         //     { userId: user.id },
//         //     jwtSecret,
//         //     { expiresIn: '1h' }
//         // )
//         const token = jwt.sign({userId: user.id}, jwtSecret)

//         // const token = {
//         //     userId: user.id,
//         //     jwtSecret: 322227
//         // }

//         // res.json({ token, userId: user.id })

//         res.json({message: 'Все заебись', token})

//     } catch (e) {
//         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
//         console.log(e)
//     }
// })

module.exports = router
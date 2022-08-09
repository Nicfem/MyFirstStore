const {validationResult}  = require('express-validator')
const userService = require('../service/user-service')
const ApiError = require('../exceptions/api-error')

class authController {
    async registration (req, res, next) {
        try {
            const errors = validationResult(req)
            const isEmptyemail = req.body.email
            if(!isEmptyemail.includes('@gmail.com')) {
                return next(ApiError.BadRequest('Електронная почта не указана'))
            }
            
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, phone, firstName, lastName} = req.body
            
            const userData = await userService.registration(email, password, phone, firstName, lastName)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 20 * 60 * 1000, httpOnly: true})
            delete userData.refreshToken

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async login (req, res, next) {
        try {
            const {email, password} =  req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 20 * 60 * 1000, httpOnly: true})
            delete userData.refreshToken
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }
    async activate (req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect('http://localhost:3000/')
        } catch (e) {
            next(e)
        }
    }
    async refresh (req, res, next) {
        try { 
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 20 * 60 * 1000, httpOnly: true})
            return res.json(userData)

        } catch (e) {
            next(e)
        }
    }
    async getUsers (req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new authController()
const UserModel = require('../models/User')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')


class UserService {
    async registration (email, password, phone, firstName, lastName) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь уже зарегестрирован')
        }
        const hashPassword = bcrypt.hashSync(password, 3)
        const activationLink = await uuid.v4() 
        const user = await UserModel.create({email, password : hashPassword, activationLink, personalData : {phone, firstName, lastName}})
        await mailService.sendActivationMail(email, `http://localhost:5000/api/auth/activate/${activationLink}`)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: user,
            ok : true
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        console.log(user.activationLink)
        if(!user) {
            throw ApiError.BadRequest('Некоректная ссылка активации')
        }
        user.isActivated = true
        await user.save()
    }

    async login(email, password) {
        const user = await UserModel.findOne({email})
        if(!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }
        const isPassEquals = bcrypt.compareSync(password, user.password)
        if(!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw ApiError.UnavthovrizedError()
        }
        const userData = tokenService.valdateRefreshToken(refreshToken)
        const tokenDromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenDromDb) {
            throw ApiError.UnavthovrizedError()
        }
        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user}
    }

    async getAllUsers() {
        const users = await UserModel.find()
        return users
    }

    async getOneUser(userId) {
        const user = await UserModel.findById(userId)
        return user
    }

    async updateUser(userId, obj) {
        console.log(userId, obj)
        const user = await UserModel.updateOne({_id : userId}, obj)
        return user
    }
}

module.exports = new UserService()
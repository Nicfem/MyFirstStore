const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token-model')


const jwtToken = '233'
const jwtrefToken = '21321'

class TokenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, jwtToken, {expiresIn: '1m'})
        const refreshToken = jwt. sign(payload, jwtrefToken, {expiresIn: '20m'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, jwtToken)
            return userData
        } catch(e) {
            return null
        }
    }

    valdateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, jwtrefToken)
            return userData
        } catch(e) {
            return null
        }
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({refreshToken})
        return tokenData
    }
}


module.exports = new TokenService()
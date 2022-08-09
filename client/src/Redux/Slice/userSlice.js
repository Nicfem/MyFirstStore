import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth : false,
    User : {
        basket : JSON.parse(localStorage.getItem('favoritesGoods') ?? '[]'),
    }
}


export const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.User = action.payload.user
            localStorage.setItem('accessToken', action.payload.accessToken)
            state.isAuth = true
        },
        logout: (state, action) => {
            localStorage.removeItem('accessToken')
            state.isAuth = false
            state.User = {
                basket : JSON.parse(localStorage.getItem('favoritesGoods') ?? '[]')
            }
        },
        setFavoriteGoods: (state, action) => {
            state.FavoriteGoods = action.payload
        },
        delUserBasket: (state, action) => {
            if(!state.isAuth) {
                let goods = JSON.parse(localStorage.getItem('favoritesGoods'))
                goods = goods.filter(x => x != action.payload)
                localStorage.setItem('favoritesGoods', JSON.stringify(goods))
            }
            state.User.basket = state.User.basket.filter(x => x != action.payload)
        },
        delAllUserBasket: (state, action) => {
            state.User.basket = state.User.basket.filter(x => !action.payload.includes(x))
        },
        delUserFav: (state, action) => {
            state.User.favoritesGoods = state.User.favoritesGoods.filter(x => x != action.payload)
        },
        addUserFav: (state, action) => {
            state.User.favoritesGoods.push(action.payload)
        },
        addUserBasket: (state, action) => {
            if(!state.isAuth) {
                let goods = JSON.parse(localStorage.getItem('favoritesGoods')) 
                if(!goods) {
                    localStorage.setItem('favoritesGoods', JSON.stringify([action.payload]))
                } else {
                    goods.push(action.payload)
                    localStorage.setItem('favoritesGoods', JSON.stringify(goods))
                }
            }
            state.User.basket.push(action.payload)
        },
    }
})

export const { setUser, setFavoriteGoods, delUserBasket, delUserFav, addUserBasket, addUserFav, logout, delAllUserBasket } = user.actions

export default user.reducer
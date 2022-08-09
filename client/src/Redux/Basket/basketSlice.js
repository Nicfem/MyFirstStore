import { createSlice } from '@reduxjs/toolkit'


export const basket = createSlice({
    name: 'basket',
    initialState: {
        Order : {
            User : {
                firstName : null,
                lastName : null,
                city : null,
                Phone: '',
                deliveryMethod : 'Доставка',
                StreetHouse : '',
                apartment : '',
                paymentMethod : 'Наличными',
                userId: null,
            },
            goods : null
        }
    },
    reducers: {
        setOrderGoods: (state, action) => {
            state.Order.goods = action.payload
        },
        setUser : (state, action) => {
            state.Order.User = action.payload
            state.Order.User.userId = action.payload.userId
        },
        increaseQuantity : (state, action) => {
            state.Order.goods = state.Order.goods.map(x => x._id == action.payload ? {...x, quantity : x.quantity += 1} : x)
        },
        decreaseQuantity : (state, action) => {
            state.Order.goods = state.Order.goods.map(x => x._id == action.payload && x.quantity > 1 ? {...x, quantity : x.quantity -= 1} : x)
        },
        setOrderOptionValue: (state, action) => {
            const {name, value} = action.payload
            state.Order.User[name] = value
        }
    }
})

export const { setOrderGoods, setUser, increaseQuantity, decreaseQuantity, setOrderOptionValue } = basket.actions

export default basket.reducer
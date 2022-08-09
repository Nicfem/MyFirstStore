import { createSlice } from '@reduxjs/toolkit'


export const createDevSlice = createSlice({
    name: 'createDevSlice',
    initialState: {
        goodsFomr : {},
        formDescriptions : [],
        newDescriptions : [],
        newDevice : {
            name : '',
            price : 0,
            brand : '',
            type : ''
        }
    },
    reducers: {
        setGoodsForm: (state, action) => {
            console.log(action.payload)
            state.goodsFomr = action.payload
        },
        setFormDescriptions: (state, action) => {
            state.formDescriptions = action.payload
        },
        changeFormDescriptions: (state, action) => {
            const {value, id} = action.payload
            state.formDescriptions = state.formDescriptions.map(x => x.id === id ? {...x, description : value} : x)
        },
        addNewDescription: (state, action) => {
            state.newDescriptions.push({title: '', description : '', id: Date.now()})
        },
        removeNewDescription: (state, action) => {
            state.newDescriptions = state.newDescriptions.filter(x => x.id !== action.payload)
        },
        changeNewDescription: (state, action) => {
            const {key, value, id} = action.payload
            state.newDescriptions = state.newDescriptions.map(x => x.id === id ? {...x, [key] : value} : x)
        },
        changeNewDevice: (state, action) => {
            let {key, value} = action.payload
            if(key === 'price') {
                value = Number(value)
                if(isNaN(value)) {
                    return
                }
            }
            state.newDevice[key] = value
        }
    }
})

export const { setGoodsForm, setFormDescriptions, changeFormDescriptions, addNewDescription, removeNewDescription, changeNewDescription, changeNewDevice } = createDevSlice.actions

export default createDevSlice.reducer
import { createSlice } from '@reduxjs/toolkit'


export const formFilter = createSlice({
    name: 'formFilter',
    initialState: {
        formOption: {
            type: null,
            descriptions : []
        }
    },
    reducers: {
        setFormOption: (state, action) => {
            state.formOption = action.payload
        },
        addNewOption: (state, action) => {
            state.formOption.descriptions.push(
                {
                    option_title : '',
                    option_value : [
                        { value : '', _id: Date.now()},
                    ],
                    _id : Date.now() + 1
                }
            )
        },
        changOptionTitle: (state, action) => {
            state.formOption.descriptions = 
            state.formOption.descriptions
            .map(
                x => x._id == action.payload.id ? 
                {...x, option_title : action.payload.value} 
                : 
                x)
        },
        addHandlOptionValue: (state, action) => {
            state.formOption.descriptions.find(x => x._id == action.payload).option_value.push({value : '', _id : Date.now()})
        },
        changOptionValue: (state, action) => {
            const arr = action.payload.arr
            const id = action.payload.id
            const option_value =  state.formOption.descriptions.find(x => x.option_title == arr).option_value
            const newOption_value = option_value.map(y => y._id == id ? {...y, value : action.payload.value} : y)
            state.formOption.descriptions.find(x => x.option_title == arr).option_value = newOption_value
        },
        deliteOption: (state, action) => {
            const option_value = state.formOption.descriptions.find(x => x._id == action.payload.title_id).option_value
            const newOption_value = option_value.filter(x => x._id !== action.payload.id)
            state.formOption.descriptions.find(x => x._id == action.payload.title_id).option_value = newOption_value
        },
        deliteTitle: (state, action) => {   
            state.formOption.descriptions = state.formOption.descriptions.filter(x => x._id !== action.payload.title_id)
        }
    }
})

export const { setFormOption, addNewOption, changOptionTitle, addHandlOptionValue, changOptionValue, deliteOption, deliteTitle } = formFilter.actions

export default formFilter.reducer
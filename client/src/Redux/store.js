import { configureStore, getDefaultMiddleware, combineReducers} from '@reduxjs/toolkit'
import counterReducer from './Slice/counterSlice'
import { apiSlice } from './Device/deviceAPI'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { types } from './Type/typeAPI'
import { brand } from './Brand/brandAPI'
import { authAPI } from './User/authAPI'
import { userAPI } from './User/userAPI'
import user from './Slice/userSlice'
import basket from './Basket/basketSlice'
import { orders }   from './Order/OrderAPI'
import formFilter from './Admin/FormFilter/FormFilter'
import createDevSlice from './Admin/CreateDevice/CreateDevSlice'

export const rootReduser = combineReducers({
    counter: counterReducer,
    user: user,        
    basket: basket,
    formFilter: formFilter,
    createDevSlice : createDevSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [types.reducerPath]: types.reducer,
    [brand.reducerPath]: brand.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath] : userAPI.reducer,
    [orders.reducerPath] : orders.reducer,
})

export const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware, types.middleware, brand.middleware, authAPI.middleware, userAPI.middleware, orders.middleware)
})


setupListeners(store.dispatch)
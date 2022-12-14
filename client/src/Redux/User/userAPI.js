import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { addUserBasket, addUserFav, delUserBasket, delUserFav, logout, setUser } from './userSlice'

const rowBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/user',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken')
        if(token) {
            headers.set('authorization', `Bearer ${token}`) 
        }
        return headers
    }
},)

const dynamicBaseQuery = async (args, api, extraOptions) => {

    let userId = api.getState().user.User?._id
    const isAuth = api.getState().user.isAuth


    if(api.type == 'mutation') {
        if(!isAuth) {
            if(args.url == 'delBasket') {
                api.dispatch(delUserBasket(args.body.goodsId)) 
                return
            }
        }
        args.body.userId = userId
    }
    
    let adjustedUrl = `${args.url}`
    if (!userId) {
        const refreshResoult = await rowBaseQuery('/refreshToken', api, extraOptions)
        if(refreshResoult.data) {
            api.dispatch(setUser(refreshResoult.data))
            userId = api.getState().user.User?.id
            return
        } 

        if(refreshResoult.error) {
            return api.dispatch(logout())
        }
    }

    if(api.type == 'query') {
        adjustedUrl = `${args.url}/${userId}`
    }
    const adjustedArgs = typeof args === 'string' ? adjustedUrl : { ...args, url: adjustedUrl } 

    let resoult = await rowBaseQuery(adjustedArgs, api, extraOptions)

    if(resoult.error && resoult.error.status === 401) {
        const refreshResoult = await rowBaseQuery('/refreshToken', api, extraOptions)
        if(refreshResoult.data) {
            api.dispatch(setUser(refreshResoult.data))
            resoult = await rowBaseQuery(adjustedArgs, api, extraOptions)
        }
        if(refreshResoult.error) {
            api.dispatch(logout())
        }
    }

    if(resoult.data) {
        if(args.url == 'delBasket') api.dispatch(delUserBasket(args.body.goodsId)) 
        
        if(args.url == 'delFavorit') api.dispatch(delUserFav(args.body.goodsId))

        if(args.url == 'addFavorit') api.dispatch(addUserFav(args.body.goodsId))

        if(args.url == 'AddToBasket') api.dispatch(addUserBasket(args.body.goodsId))

        if(resoult.data == 'ok') {
            return resoult
        }
        api.dispatch(setUser(resoult.data))
    }

    return resoult
}

export const userAPI = createApi({
    reducerPath: 'userapi',
    baseQuery: dynamicBaseQuery,
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: `info`
            }),
        }),
        addFavoriteGood: builder.mutation({
            query:(body) => ({
                url: 'addFavorit',
                method: 'PUT',
                body
            }),
        }),
        delFavoriteGood: builder.mutation({
            query:(body) => ({
                url: 'delFavorit',
                method: 'PUT',
                body
            }),
        }),
        AddToBasket: builder.mutation({
            query:(body) => ({
                url: 'AddToBasket',
                method: 'PUT',
                body
            }),
        }),
        delBasket: builder.mutation({
            query:(body) => ({
                url: 'delBasket',
                method: 'PUT',
                body
            }),
        }),
        refreshToken: builder.query({
            query:() => ({
                url : 'refreshToken',
            })
        })
    })
})


export const { useAddFavoriteGoodMutation, useDelFavoriteGoodMutation, useLazyGetUserQuery, useAddToBasketMutation, useDelBasketMutation } = userAPI
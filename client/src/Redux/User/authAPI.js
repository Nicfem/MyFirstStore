import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
    reducerPath: 'auhtapi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/auth',
    }),
    endpoints: (builder) => ({
        registration: builder.mutation({
            query: (body) => ({
                url: '/registration',
                method: 'POST',
                body,
                credentials: 'include'
            })
        }),
        login: builder.mutation({
            query:(body) => ({
                url: '/login',
                method: 'POST',
                body,
                credentials: 'include',
            })
        }),
        // users: builder.query({
        //     query:(id) => ({
        //         url: `in/${id}`,
        //         credentials: 'include',
        //         headers: {
        //             authorization: `Bearer ${localStorage.getItem('accessToken')}`
        //         }
        //     })
        // }),
        refresh: builder.mutation({
            query:() => ({
                url: '/refresh',
                credentials: 'include'
            })
        }),
        addFavorit: builder.mutation({
            query:(id, body) => ({
                url: `addFavorit${id}`,
                credentials: 'include',
                method: 'POST',
                body : body
            })
        })
    })
})


export const { useRegistrationMutation, useLoginMutation, useRefreshMutation } = authAPI
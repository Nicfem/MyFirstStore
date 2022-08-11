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
        })
    })
})


export const { useRegistrationMutation, useLoginMutation} = authAPI
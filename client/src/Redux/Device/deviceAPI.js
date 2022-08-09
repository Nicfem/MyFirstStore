import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/Product/brand',
    }),
    tagTypes: ['Options'],
    endpoints: (builder) => ({
        getDiviceById: builder.query({
            query: ({body = '',page = '0',limit = '10', type = '',}) => ({
                url: `/${ type && `?type=${type}`}${type ? `&` : '?'}page=${page}&limit=${limit}${'&' + body}`
            })
        }),
        createDevice: builder.mutation({
            query: (body) => ({
                url: '/',
                method: 'POST',
                body,
            })
        }),
        getDeviceBy: builder.query({
            query:(id) => ({
                url: `/${id}`
            })
        }),
        getDeiceByType: builder.mutation({
            query:(body) => ({
                url: `?type=${body}`
            })
        }),
        getOption: builder.query({
            query:(type) => ({
                url: `/option${'?type=' + type}`
            })
        }),
        getOptionAll: builder.query({
            query:() => ({
                url: '/options'
            }),
        }),
        getAllById: builder.mutation({
            query:(id) => ({
                url: `deviceById?id=${id}`
            })
        }),
        getAllById1: builder.query({
            query:(id) => ({
                url: `deviceById?id=${id}`
            })
        }),
    })
})

export const { useGetDiviceByIdQuery, useCreateDeviceMutation, useGetDeviceByQuery, useGetDeiceByTypeMutation, useGetOptionQuery, useGetOptionAllQuery, useGetAllByIdMutation, useGetAllById1Query } = apiSlice

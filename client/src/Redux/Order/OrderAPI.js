import { buildCreateApi, createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const orders = createApi({
    reducerPath: 'orders',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/orders'
    }),
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({
                url: 'getAll',
            }),
        }),
        getOrdersOne: build.query({
            query: (id) => ({
                url: `getOne/${id}`,
            }),
        }),
        getAllWithGoods: build.query({
            query: (id) => ({
                url: `getAllWithGoods/${id}`
            })
        })
    })
})

export const { useGetOrdersQuery, useGetOrdersOneQuery, useGetAllWithGoodsQuery } = orders
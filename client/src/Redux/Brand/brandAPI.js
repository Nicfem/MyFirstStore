
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const brand = createApi({
    reducerPath: 'Brand',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api'
    }),
    tagTypes: ['Brand'],
    endpoints: (build) => ({
        getBrand: build.query({
            query: () => ({
                url: '/brand'
            }),
            providesTags: ['Brand']
        }),
        addBrand: build.mutation({
            query: (body) => ({
                url: '/brand',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Brand']
        })
    }),
})

export const { useGetBrandQuery, useAddBrandMutation } = brand
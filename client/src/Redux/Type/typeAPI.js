import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


export const types = createApi({
    reducerPath: 'Posts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api'
    }),

    tagTypes: ['Post'],
    endpoints: (build) => ({
        getTypes: build.query({
            query: () => ({
                url: '/types',
                // params: {
                //     _limit: limit
                // }
            }),
            providesTags: ['Post']
        }),
        addType: build.mutation({
            query: (body) => ({
                url: `/types`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Post'],
        }),
    })
})

export const { useGetTypesQuery, useAddTypeMutation } = types
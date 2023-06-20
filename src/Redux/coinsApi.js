import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const coinsApi = createApi({
    reducerPath: 'coinsApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.coincap.io/v2/'}),
    endpoints: (build) => ({
        getCoins: build.query({
            query: (query= 10) => ({
                url: `assets?limit=${query}`,
                method: "GET",
            }),
        }),
        getCoin: build.query({
            query: (id) => ({
                url: `assets/${id}`,
                method: "GET",
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        getHistory: build.query({
            query: (coinId) => ({
                url: `assets/${coinId}/history?interval=d1`,
                method: "GET",
            }),
            transformResponse: (response, meta, arg) => response.data
        })
    })
})

export const {useGetCoinsQuery, useGetCoinQuery, useGetHistoryQuery, } = coinsApi
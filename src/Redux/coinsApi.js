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
        })
    })
})

export const {useGetCoinsQuery} = coinsApi
import {configureStore} from "@reduxjs/toolkit";
import {coinsApi} from "./coinsApi";

export const store = configureStore({
    reducer: {
        [coinsApi.reducerPath]: coinsApi.reducer,
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 }
    }).concat(coinsApi.middleware))
})
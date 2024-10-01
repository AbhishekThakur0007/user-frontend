import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
    },
    middleware:(getDefaultMiddleWare)=>
        getDefaultMiddleWare().concat(userApi.middleware)
})
setupListeners(store.dispatch);

export default store
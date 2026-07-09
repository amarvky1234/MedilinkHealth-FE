import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { doctorApi } from "../services/doctorService";
import { otpApi } from "../services/otpService";
import { authApi } from "../services/authService";
import { userApi } from "../services/userService";
import { appointmentApi } from "../services/appointmentService";

export const store = configureStore({
    reducer: {
        [doctorApi.reducerPath] : doctorApi.reducer,
        [otpApi.reducerPath] : otpApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [appointmentApi.reducerPath] : appointmentApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
        doctorApi.middleware,
        otpApi.middleware,
        authApi.middleware,
        userApi.middleware,
        appointmentApi.middleware,
    ),

})

setupListeners(store.dispatch);
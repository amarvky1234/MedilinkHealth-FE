import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const otpApi = createApi({
    reducerPath: "otpApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3300/otp",
    }),
    endpoints: (builder) => ({
        sendOTP: builder.mutation({
            query: (email) => ({
                url: "/sendotp",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { email },
            }),
        }),

        verifyOTP: builder.mutation({
            query: ({ email, otp }) => ({
                url: "/verifyotp",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: { email, otp },
            }),
        }),
    }),
});

export const {
    useSendOTPMutation,
    useVerifyOTPMutation,
} = otpApi;
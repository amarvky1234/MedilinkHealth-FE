import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appointmentApi = createApi({
    reducerPath: "appointmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3300/appointment",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;

        }
    }),

    endpoints: (builder) => ({

        bookAppointment: builder.mutation({
            query:(details)=>({
                url:"/book",
                method:"POST",
                body:details
            })
        }),

    }),
});

export const {
    useBookAppointmentMutation,
} = appointmentApi;
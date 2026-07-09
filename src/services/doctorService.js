import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const doctorApi = createApi({
    reducerPath: "doctorApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3300/doctor",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;

        }
    }),

    endpoints: (builder) => ({

        getDoctor: builder.query({
            query: ({ search = "", location = "", page = 1 } = {}) => ({
                url: "get",
                method: "GET",
                params: {
                    search,
                    location,
                    page,
                },
            }),
        }),

        getDoctorById: builder.query({
            query: (id) => ({
                url: `get/${id}`,
                method: "GET",
            }),
        }),

        addDoctor: builder.mutation({
            query: (details) => {
                return {
                    url: "/save",
                    method: "POST",
                    body: details,
                };
            },
        }),

    }),
});

export const {
    useGetDoctorQuery,
    useGetDoctorByIdQuery,
    useAddDoctorMutation,
} = doctorApi;
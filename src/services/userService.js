import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3300/user",
        prepareHeaders: (headers, {getState}) => {
            headers.set("Content-Type", "application/json");
            return headers;
        },
    }),

    endpoints: (builder) => ({
        
        addUser: builder.mutation({
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
    useAddUserMutation,
} = userApi;
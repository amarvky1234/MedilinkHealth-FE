import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3300/auth",
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem("token");
            if(token){
                headers.set("Authorization",`Bearer ${token}`);
            }

            return headers;

        }

    }),
    endpoints: (builder) => ({
        
        login: builder.mutation({
            query: (details) => {
                return {
                    url: "/login",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: details,
                };
            },
        }),
    }),
});

export const {useLoginMutation } = authApi;
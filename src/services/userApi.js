import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath:"userApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:1111/user"}),
    endpoints:(builder)=>({
        getUser:builder.query({
            query:({page , search = '',age = null ,gender = ''})=>{
                let baseQuery = `/all?page=${page}`;
                if(search !== ''){
                    baseQuery += `&search=${search}` 
                }
                if(age !== ''){
                    baseQuery += `&age=${age}`
                }
                if(gender !== ''){
                    baseQuery += `&gender=${gender}`
                }
                return baseQuery;
            }
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
        createUser:builder.mutation({
            query:(formData)=>({
                url:`/new`,
                method:`POST`,
                body:formData
            })
        })
    })
})
    
export const {useGetUserQuery,useDeleteUserMutation,useCreateUserMutation} = userApi
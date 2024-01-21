import { ApiSlice } from "./apiSlice";
import { USERS_URL, EMAIL_VERIFICATION_URL, ORDERS_URL } from "../constants";

export const usersSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
       loginUser : builder.mutation({
         query:(data)=> ({
             url: `${USERS_URL}/login`,
             method:'POST',
             body:data
         })
       }),
       RegisterUser : builder.mutation({
        query:(data)=> ({
            url: `${USERS_URL}/register`,
            method:'POST',
            body:data
        })
      }),
      verifyEmail : builder.mutation({
        query:(data)=> ({
            url: EMAIL_VERIFICATION_URL,
            method:'POST',
            body:data
        })
      }),
      reverifyEmail : builder.mutation({
        query:()=> ({
            url: `${EMAIL_VERIFICATION_URL}/reverification`,
            method:'POST'
        })
      }),
      logoutUser : builder.mutation({
        query:()=> ({
            url: `${USERS_URL}/logout`,
            method:'POST',    
        })
      }),
      profile : builder.query({
        query:()=> ({
            url: `${USERS_URL}/profile`,    
        }),
        keepUnusedDataFor: 5
      }),
      getMyOrders : builder.query({
        query:()=> ({
            url: `${ORDERS_URL}/myorders`,    
        }),
        keepUnusedDataFor: 5
      }),
      getUsers : builder.query({
        query:()=> ({
            url: USERS_URL,    
        }),
        keepUnusedDataFor: 5
      }),
      deleteUsers : builder.mutation({
        query:(id)=> ({
            url: `${USERS_URL}/${id}`,
            method:'DELETE'    
        }),
      }),
      updateUserByAdmin : builder.mutation({
        query:(data)=> ({
            url: `${USERS_URL}/${data.userId}`,
            method:'PUT',   
            body: data 
        }),
      }),
      getUserById : builder.query({
        query:(id)=> ({
            url: `${USERS_URL}/${id}`, 
        }),
        keepUnusedDataFor: 5
      }),
      updateUserProfile : builder.mutation({
        query:(data)=> ({
            url: `${USERS_URL}/profile`,  
            method:'PUT',
            body: data
        }), 
      }),
    })
})

export const { useLoginUserMutation, useRegisterUserMutation, useDeleteUsersMutation,
   useUpdateUserByAdminMutation,
   useVerifyEmailMutation, useLogoutUserMutation,  useGetUserByIdQuery, 
   useProfileQuery, useGetMyOrdersQuery, useGetUsersQuery, useReverifyEmailMutation,
    useUpdateUserProfileMutation} = usersSlice;
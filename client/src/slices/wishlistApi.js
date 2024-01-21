import { WISHLIST_URL } from "../constants";
import { ApiSlice } from "./apiSlice";
export const wishlistSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
         addToWishlist: builder.mutation({
            query:(data)=> ({
                 url: WISHLIST_URL,
                 method: 'POST',
                 body: {...data}
            })
         }),
         removeFromWishlist: builder.mutation({
            query:(data)=> ({
                 url: WISHLIST_URL,
                 method: 'DELETE',
                 body: data
            })
         }),
         getWishlistProducts: builder.query({
            query:()=> ({
                 url: WISHLIST_URL,
            }),
            keepUnusedDataFor: 5
         }),

    })
})

export const { useAddToWishlistMutation, useGetWishlistProductsQuery, useRemoveFromWishlistMutation} = wishlistSlice;
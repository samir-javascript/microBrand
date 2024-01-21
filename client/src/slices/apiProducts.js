import { ApiSlice } from "./apiSlice";
import {  PRODUCTS_URL } from "../constants";

export const productsSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
        getProducts : builder.query({
            query: ({pageNumber, keyword})=> ({
                url: PRODUCTS_URL,
                params : {
                   pageNumber,
                   keyword
                }
            }),
            
            keepUnusedDataFor: 5
        }),
        updateProducts : builder.mutation({
            query: (data)=> ({
                url: `${PRODUCTS_URL}/${data.productId}`,
                method:'PUT',
                body: data
            }),
            invalidatesTags: ['Product'],
           
        }),
        getSingleProduct : builder.query({
            query: (id)=> ({
               url: `${PRODUCTS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5
        }),
        getProductsByCatgories : builder.query({
            query: (categoryName)=> ({
               url: `${PRODUCTS_URL}/category/${categoryName}`,
            }),
            keepUnusedDataFor: 5
        }),
        deleteProduct : builder.mutation({
            query: (id)=> ({
               url: `${PRODUCTS_URL}/${id}`,
               method :'DELETE'
            }),
        }),
        createProduct : builder.mutation({
            query: ()=> ({
               url: PRODUCTS_URL,
               method:'POST'
            }),
        }),
        createReview : builder.mutation({
            query: (data)=> ({
               url: `${PRODUCTS_URL}/${data.productId}/reviews`,
               method:'POST',
               body:data

            }),
            invalidatesTags: ['Product']
        }),
       
         
       
    })
})
export const { useGetProductsQuery,  
   
    useGetSingleProductQuery,
  
    useUpdateProductsMutation,
     useCreateReviewMutation,
     useCreateProductMutation,
     useGetProductsByCatgoriesQuery,
      useDeleteProductMutation } = productsSlice;
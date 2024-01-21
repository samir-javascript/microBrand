import { ApiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

export const ordersSlice = ApiSlice.injectEndpoints({
    endpoints:(builder)=> ({
       createOrder:builder.mutation({
         query:(data)=> ({
             url: ORDERS_URL,
             method:'POST',
             body:{...data}
         })
       }),
       getOrderById:builder.query({
        query:(id)=> ({
            url: `${ORDERS_URL}/${id}`,
        }),
        keepUnusedDataFor: 5
      }),
      getPayPalClientID:builder.query({
        query:()=> ({
            url: PAYPAL_URL,
        }),
        keepUnusedDataFor: 5
      }),
      updateOrderToPaid:builder.mutation({
        query:({id,details})=> ({
            url: `${ORDERS_URL}/${id}/pay`,
            method: 'PUT',
            body: details
        }),
      }),
      updateOrderToDelivered:builder.mutation({
        query:(id)=> ({
            url: `${ORDERS_URL}/${id}/deliver`,
            method: 'PUT',
        }),
      }),
      getOrders:builder.query({
        query:()=> ({
            url: ORDERS_URL,
        }),
        keepUnusedDataFor: 5
      }),

       
    })
})
export const { useCreateOrderMutation, 
  useGetOrderByIdQuery, 
  useGetPayPalClientIDQuery,
 useUpdateOrderToDeliveredMutation, 
 useUpdateOrderToPaidMutation,
 useGetOrdersQuery
} = ordersSlice;
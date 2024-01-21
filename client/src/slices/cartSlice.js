import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils";
const initialState = localStorage.getItem('microProducts') ? JSON.parse(localStorage.getItem('microProducts'))
: {cartItems:[], shippingAddress:{}, paymentMethod:'PayPal', };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart:(state , action)=> {
           const {...item} =  action.payload;
           const existItem = state.cartItems.find(x => x._id === item._id);
           if (existItem) {
            state.cartItems = state.cartItems.map((x) =>
              x._id === existItem._id ? item : x
            );
          } else {
            state.cartItems = [...state.cartItems, item];
          }
          return updateCart(state, item);
        },
        removeFromCart:(state,action)=> {
           const itemToRemove = action.payload;
           state.cartItems = state.cartItems.filter(item => item._id !== itemToRemove)
           return updateCart(state)
        },
        saveShipping:(state,action)=> {
           state.shippingAddress = action.payload;
           return updateCart(state)
        },
        savePaymentMethod: (state,action)=> {
           state.paymentMethod = action.payload;
           return updateCart(state)
        },
        clearCart:(state,action)=> {
           state.cartItems = [];
           return updateCart(state)
        },
        resetCart :(state, action)=> (state = initialState)
    }
})
export const { addToCart, removeFromCart , saveShipping, resetCart, savePaymentMethod, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
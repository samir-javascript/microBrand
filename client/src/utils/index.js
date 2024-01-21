export const addDecimals = (num)=> {
   return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state)=> {
   const itemsPrice = state.cartItems.reduce((acc, item)=> acc +( item.price * 100 * item.qty) / 100, 0);
   state.itemsPrice = addDecimals(itemsPrice);
   const shippingPrice = itemsPrice > 100 ? 0 : 10;
   state.shippingPrice = addDecimals(shippingPrice)
   const taxPrice = itemsPrice * 0.15;
   state.taxPrice = addDecimals(taxPrice)
   const totalPrice = Number(itemsPrice) 
   + Number(shippingPrice)
   + Number(taxPrice);
   state.totalPrice = addDecimals(totalPrice);
   localStorage.setItem('microProducts', JSON.stringify(state));
   return state;
}

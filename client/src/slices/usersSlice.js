import { createSlice } from "@reduxjs/toolkit";

const initialState = 
{
    userInfo: localStorage.getItem('microUsers') ? JSON.parse(localStorage.getItem('microUsers'))
:
 null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
       setCredentials:(state,action)=> {
          state.userInfo = action.payload;
          localStorage.setItem('microUsers', JSON.stringify(action.payload))
       },
       logoutUser:(state,action)=> {
         state.userInfo = null;
         localStorage.removeItem('microUsers');
       }
    }
})
export const { setCredentials, logoutUser } = authSlice.actions;
export default authSlice.reducer;
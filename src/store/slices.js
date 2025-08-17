import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    userInfo:{}
}

const authSlice = createSlice({
    name:"auth",
    initialState,

    reducers:{
        login: (state,action) =>{
            state.status = true
            state.userInfo = action.payload
        },

        logOut: (state)=>{
            state.status = false
            state.userInfo = null
        }
    }
})

export const {login, logOut} = authSlice.actions
export default authSlice.reducer
import { createSlice } from "@reduxjs/toolkit";


type UserState = {
    isAuth:boolean;
}



let initialState:UserState ={
    isAuth:false,
    
}

let userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    },
})

export const {} = userSlice.actions;
export default userSlice.reducer
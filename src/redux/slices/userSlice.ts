import { createSlice } from "@reduxjs/toolkit";


type UserState = {
    isAuth:boolean;
    userstatus:'user'|'editor'|'admin';
}

let initialState:UserState ={
    isAuth:false,
    userstatus:'user',
}

let userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

    },
})

export const {} = userSlice.actions;
export default userSlice.reducer
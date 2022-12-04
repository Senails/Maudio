import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SaveToken } from "../../Utils/other/GetSaveToken";


type UserState = {
    isAuth:boolean;
    userstatus:'user'|'editor'|'admin';
    token:string;
}

let initialState:UserState ={
    isAuth:false,
    userstatus:'user',
    token:'',
}

let userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginUser(state,action:PayloadAction<{token: string, status: 'user'|'editor'|'admin'}>){
            let {token,status} = action.payload;

            SaveToken(token);
            state.isAuth=true;
            state.token=token;
            state.userstatus=status;
        },
    },
})

export const {loginUser} = userSlice.actions;
export default userSlice.reducer
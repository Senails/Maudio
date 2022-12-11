import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SaveToken } from "../../Utils/appData/GetSaveToken";


type UserState = {
    isAuth:boolean;
    userstatus:'user'|'editor'|'admin';
    token:string;
    acttimeModal:boolean;
}

let initialState:UserState ={
    isAuth:false,
    userstatus:'user',
    token:'',
    acttimeModal:false,
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
        showhidemodal(state,action:PayloadAction<boolean>){
            state.acttimeModal=action.payload;
        }
    },
})

export const {
    loginUser,
    showhidemodal,
} = userSlice.actions;
export default userSlice.reducer
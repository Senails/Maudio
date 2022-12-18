import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SaveToken } from "../../Utils/appData/GetSaveToken";


type UserState = {
    isAuth:boolean;
    userName:string;
    userstatus:'user'|'editor'|'admin';
    token:string;
    acttimeModal:boolean;
}

let initialState:UserState ={
    isAuth:false,
    userName:'',
    userstatus:'user',
    token:'',
    acttimeModal:false,
}

let userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginUser(state,action:PayloadAction<{token: string, status: 'user'|'editor'|'admin',userName:string}>){
            let {token,status,userName} = action.payload;


            SaveToken(token);
            state.userName=userName;
            state.isAuth=true;
            state.token=token;
            state.userstatus=status;
        },
        showhidemodal(state,action:PayloadAction<boolean>){
            state.acttimeModal=action.payload;
        },
        exitUser(state){
            state.userName='';
            state.isAuth=false;
            state.token='';
            state.userstatus='user';
            SaveToken('');
        },
    },
})

export const {
    loginUser,
    showhidemodal,
    exitUser,
} = userSlice.actions;
export default userSlice.reducer
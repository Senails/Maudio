import { authUp } from "../../api/auth/authUp";
import { loginUser } from "../../redux/slices/userSlice";
import { dispatch } from "../../redux/store";

let keytoken = 'jfgk26065hfkew4';

export function GetToken():string{
    let token = localStorage.getItem(keytoken);

    if (token && token!=='') return token;
    return 'none';
}

export function SaveToken(token:string){
    localStorage.setItem(keytoken,token);
}

export async function tryauth() {
    let logindata = await authUp();
    if (logindata!=='notoken'){
      dispatch(loginUser(logindata));
    }
    return 'end';
}
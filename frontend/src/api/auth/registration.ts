import { sleep } from "../../Utils/other/sleep";
import { adress } from "../apiAdress";
import { LoginData } from "./loginUp";

type ReturnType = {
    type:'ok'|'error',
    message?:string,
    json?:LoginData,
}

export async function registration(name:string,email:string,password:string):Promise<ReturnType>{
    let apiadress=adress+`/api/register`;
    let apiObj = {
        name,
        email,
        password,
    }
    
    try{
        let res = await fetch(apiadress,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(apiObj),
        })
        let json:ReturnType = await res.json();

        return json;
    }catch{
        return {
            type:'error',
            message:'ошибка при регистрации',
        };
    }
}
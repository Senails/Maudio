import { adress } from "../apiAdress";
import { LoginData } from "./loginUp";


export async function googleAuth(token:string):Promise<LoginData|'error'>{
    if (token==='none') return 'error';
    try{
        let apiadress=adress+`/api/googleAuth`;
        let res = await fetch(apiadress,{
            method:'POST',
            headers:{
                'authorization': token,
            },
        })
        let json = await res.json();

        return json;
    }catch{
        return 'error';
    }   
}
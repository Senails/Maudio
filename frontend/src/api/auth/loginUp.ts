import { adress } from "../apiAdress";

export type LoginData = {
    token:string,
    status:'user'|'editor'|'admin';
}

export async function loginUp(login:string,password:string):Promise<LoginData|'error'>{
    let apiadress=adress+`/api/login`;
    let apiObj = {
        login,
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
        let json:LoginData= await res.json();
        return json;
    }catch{
        return 'error';
    }
}
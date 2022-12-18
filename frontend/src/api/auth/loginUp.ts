import { adress } from "../apiAdress";

export type LoginData = {
    token:string;
    status:'user'|'editor'|'admin';
    userName:string;
}
//1


export async function loginUp(email:string,password:string):Promise<LoginData|'error'>{
    let apiadress=adress+`/api/login`;
    let apiObj = {
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
        let json:LoginData= await res.json();
        return json;
    }catch{
        return 'error';
    }
}
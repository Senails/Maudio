import { GetToken } from "../../Utils/other/GetSaveToken";
import { adress } from "../apiAdress";

type ResponseType = {
    url:string,
    googleid:string,
}

export async function sendFileToBackend(file:File,abortControler?:AbortController):Promise<ResponseType|'error'> {
    let mimeType =file.type;
    let apiadress=adress+`/api/sendfile`;

    try{
        let res = await fetch(apiadress,{
            method:'POST',
            headers:{
                'Content-Type': `${mimeType}`,
                'authorization': GetToken(),
            },
            body:file,
            signal:abortControler?.signal,
        })
        let json = await res.json();

        let result:ResponseType = {
            url:json.URL,
            googleid: json.googleID,
        }
        return result;
    }catch{
        return 'error';
    }
}
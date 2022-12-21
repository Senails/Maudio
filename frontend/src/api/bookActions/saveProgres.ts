import { adress } from "../apiAdress";

export async function saveProgres(bookid:string,token:string,progress:number){
    let apiadress=adress+`/api/setUserProgress`;
    try{
        let reqBody = {
            bookid: bookid,
            progress: progress
        }

        let res = await fetch(apiadress,{
            method: 'POST',
            headers: {
              'Authorization': token,
            },
            body: JSON.stringify(reqBody)
        });
    }catch{
        return "error";
    }
}
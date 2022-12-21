import { store } from "../../redux/store";
import { adress } from "../apiAdress";

export async function SetCenseOnBackend(_id:string,reit:number){
    let token = store.getState().user.token;


    let apiadress=adress+`/api/setReiting`;
    try{

        let reqBody = {
            bookid: _id,
            reiting: reit
        }

        let res = await fetch(apiadress,{
            method: 'POST',
            headers: {
              'Authorization': token,
            },
            body: JSON.stringify(reqBody)
          });
        let result = await res.json();

        return result;
    }catch{
        return "error";
    }
}
import { store } from "../../redux/store";
import { adress } from "../apiAdress";

export async function SetLikeOnBackend(_id:string,like:boolean){
    let token = store.getState().user.token;

    let apiadress=adress+`/api/setLike`;
    try{

        let reqBody = {
            bookid: _id,
            like: like
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
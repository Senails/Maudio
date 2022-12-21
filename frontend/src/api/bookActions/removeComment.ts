import { store } from "../../redux/store";
import { adress } from "../apiAdress";
import { FetchComment } from "../getbookdata";

export async function removeCommentOnBackend(_id:string,comm:FetchComment){
    let token = store.getState().user.token;

    let apiadress=adress+`/api/setRemoveComment`;
    try{

        let reqBody = {
            bookid: _id,
            commentData: comm
        }

        let res = await fetch(apiadress,{
            method: 'POST',
            headers: {
              'Authorization': token,
            },
            body: JSON.stringify(reqBody)
          });
        let arrayCard = await res.json();

        return arrayCard;
    }catch{
        return "error";
    }
}
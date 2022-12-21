import { store } from "../redux/store";
import { BookMapFetch } from "../types/api";
import { Seria } from "../types/pleerSlice";
import { bookMapToSeria } from "../Utils/apiUtils/apiUtils";
import { GetToken } from "../Utils/appData/GetSaveToken";
import { adress } from "./apiAdress";

export async function getBookMap(href:string):Promise<Seria|'error'>{
    try{
        let token = store.getState().user.token || GetToken();

        let apiadress=adress+`/api/getbookmap/${href}`;
        let res = await fetch(apiadress,{
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });
        let json:BookMapFetch = await res.json();

        if (json.bookcount===0) return 'error';
        let seria: Seria = bookMapToSeria(json);

        if (seria.collections.length===0) return 'error';
        return seria;
    }catch{
        return 'error';
    }
}

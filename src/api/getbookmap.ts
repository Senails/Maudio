import { BookMapFetch } from "../types/api";
import { Seria } from "../types/pleerSlice";
import { bookMapToSeria } from "../Utils/apiUtils/apiUtils";
import { adress } from "./apiAdress";

export async function getBookMap(bookname:string):Promise<Seria|'error'>{
    try{
        let apiadress=adress+`/api/getbookmap/${bookname}`;
        let res = await fetch(apiadress);
        let json:BookMapFetch = await res.json();
        if (json.bookcount===0) return 'error';

        let seria: Seria = bookMapToSeria(json);

        if (seria.collections.length===0) return 'error';
        return seria;
    }catch{
        return 'error';
    }
}

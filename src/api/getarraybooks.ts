import { BookCardtype } from "../redux/slices/searchSlice";
import { BookDataFetch } from "../types/api";
import { adress } from "./apiAdress";

export async function getArrayBooks(param:string):Promise<BookCardtype[]|'error'>{
    let apiadress=adress+`/api/getbooks/${param}`;
    try{
        let res = await fetch(apiadress);
        let json = await res.json();
        let arrayCard = JSON.parse(json);

        let needArray: BookCardtype[] = arrayCard
        .map((bookcard:BookDataFetch)=>{
            let {
                authtorname,
                image,
                bookcount,
                description,
                href,
                name,
             } = bookcard;

            return {
                href,
                img: image.url,
                bookcount,
                authtor:authtorname,
                name: name,
                description,
            }
        })

        return needArray;
    }catch{
        return "error";
    }
}
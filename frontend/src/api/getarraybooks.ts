import { BookCardtype } from "../redux/slices/searchSlice";
import { BookDataFetch } from "../types/api";
import { adress } from "./apiAdress";

export async function getArrayBooks(param:string,sortingParam:string,filterParam:string,token:string):Promise<BookCardtype[]|'error'>{
    let apiadress=adress+`/api/getbooks`;
    try{

        let reqBody = {
            sorting: sortingParam,
            search: param,
            filter: filterParam
        }

        let res = await fetch(apiadress,{
            method: 'POST',
            headers: {
              'Authorization': token,
            },
            body: JSON.stringify(reqBody)
          });
        let arrayCard = await res.json();

        let needArray: BookCardtype[] = arrayCard
        .map((bookcard:BookDataFetch)=>{
            let {
                _id,
                authtorname,
                image,
                href,
                name,
                Reiting,
                like,
                progress,
             } = bookcard;

            return {
                _id,
                href,
                img: image.url,
                authtor:authtorname,
                name: name,
                reiting:Reiting,
                like,
                progress,
            }
        })

        return needArray;
    }catch{
        return "error";
    }
}
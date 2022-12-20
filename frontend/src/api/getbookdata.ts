import { fetchImage } from "../types/api";
import { adress } from "./apiAdress";

export type FetchComment={
    date:number;
    text:string;
    username:string;
}

export type BookData = {
    _id:string;
    Reiting:number;
    authtorname:string;
    bookcount:number;
    comments:FetchComment[];
    description:string;
    href:string;
    image:fetchImage;
    name:string;
    like?:boolean;
    userReiting?:number;
    progress?:number;
}

export async function getBookData(href:string,token:string):Promise<BookData|'error'>{
    try{
        let apiadress=adress+`/api/getbookdata/${href}`;
        let res = await fetch(apiadress,{
            method: 'GET',
            headers: {
                'Authorization': token,
            },
        });
        let json:BookData = await res.json();
        return json;
    }catch{
        return 'error'
    }
}
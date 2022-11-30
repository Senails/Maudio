import { BookData } from "../pages/BookInfoPage/BookInfoPage";
import { adress } from "./apiAdress";

export async function getBookData(href:string):Promise<BookData|'error'>{
    let apiadress=adress+`/api/getbookdata/${href}`;
    let res = await fetch(apiadress);
    let json = await res.json();

    let {name, authtorname, bookcount, description, image } = json;
    let bookdata:BookData = {
        href,
        name,
        authtor: authtorname,
        description: description,
        bookscount: bookcount,
        bookimage: image.url,
    }

    return bookdata;
}
import { BookCardtype } from "../redux/slices/searchSlice";
import { sleep } from "../Utils/other/sleep";

export async function getArrayBooks(param:string):Promise<BookCardtype[]|'error'>{
    await sleep(300);

    //тут выполнить запрос
    let book: BookCardtype = {
        href:'/bookInfo/MaxFrei',
        img: './img1.jpg',
        bookcount: 12,
        authtor:'Макс Фрай',
        name:'Сэр Макс из Ехо1',
    }
    let books = [book,book,book,book,book,book];
    //

    return books;
}
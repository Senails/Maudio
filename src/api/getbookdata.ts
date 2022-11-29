import { BookData } from "../pages/BookInfoPage/BookInfoPage";
import { adress } from "./apiAdress";

export async function getBookData(href:string):Promise<BookData|'error'>{
    let apiadress=adress+`/api/getbookdata/${href}`;
    let res = await fetch(apiadress);
    let json = await res.json();

    console.log(json);

    //тут выполнить запрос
    let bookdata:BookData = {
        name:'Сэр Макс из Ехо',
        authtor:'Макс Фрай',
        description:'В нашем, земном мире Макс был неудачником, находившим отдых только в красочных снах. И однажды от человека из сна он получил предложение, от которого невозможно отказаться. Он навеки оставил Землю и перенёсся в волшебный мир Ехо. Здесь он — правая рука великого и ужасного сэра Джуффина Халли, главы тайного сыска, борющегося с незаконным применением магии. Его считают загадочным варваром, гениальным сыщиком и опаснейшим человеком…',
        bookscount:12,
        bookimage:'http://localhost:3000/static/media/img1.a13b7f9a6e77a8409bdb.jpg',
    }
    //

    return bookdata;
}
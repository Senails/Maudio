import {findBookByHref,findBooksBySearch,bookMapToData} from './../utils/reimport.js';

export async function getBookData(req,res){
    let {href} = req.params;
    let book = await findBookByHref(href);
    book = bookMapToData(book);
    res.json(book);
}
export async function getBookMap(req,res){
    let {href} = req.params;
    let book = await findBookByHref(href);

    res.json(book);
}
export async function getBooksData(req,res){
    let {search} = req.params;
    let search1=''
    if (search) search1=search;
    let books = await findBooksBySearch(search1);

    books=books.map((bookcard)=>bookMapToData(bookcard));
    res.json(books);
}
import {findBookByHref,findBooksBySearch,bookMapToData} from './../utils/reimport.js';

export async function getBookData(req,res){
    let {href} = req.params;
    let book = await findBookByHref(href);
    book = bookMapToData(book);
    let json = JSON.stringify(book);

    res.json(json);
}

export async function getBookMap(req,res){
    let {href} = req.params;
    let book = await findBookByHref(href);
    let json = JSON.stringify(book);

    res.json(json);
}

export async function getBooksData(req,res){
    let {search} = req.params;
    let books = await findBooksBySearch(search);
    books=books.map((bookcard)=>bookMapToData(bookcard));
    let json = JSON.stringify(books);
    res.json(json);
}
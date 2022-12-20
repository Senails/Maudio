import jwt from 'jsonwebtoken';
import {secretJWT} from './authHandlers.js';

import {findBookMapa,findBooksDataWithParams,findBookData} from './../utils/reimport.js';

export async function getBookData(req,res){
    let {href} = req.params;

    let token = req.headers.authorization;
    let userID = '';
    try{
        if (token) userID = jwt.decode(token, secretJWT).id;
    }catch{}

    try{
        let book = await findBookData(href,userID);
        res.json(book);
    }catch{
        res.send('error');
    }
}
export async function getBookMap(req,res){
    let {href} = req.params;

    let token = req.headers.authorization;
    let userID = '';
    try{
        if (token) userID = jwt.decode(token, secretJWT).id;
    }catch{}

    try{
        let book = await findBookMapa(href,userID);
        res.json(book);
    }catch{
        res.send('error');
    }
}
export async function getBooksDataPost(req,res){
    let token = req.headers.authorization;
    let userID = '';
    try{
        if (token) userID = jwt.decode(token, secretJWT).id;
    }catch{}

    let {sorting , filter , search} = req.body;

    try{
        let books = await findBooksDataWithParams(sorting , filter , search, userID);
        res.json(books);
    }catch{
        res.send('error');
    }
}
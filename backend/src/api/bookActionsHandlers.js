import {
    addLikeBook,
    cancelLikeBook,
    userSetReiting,
    saveComment,
    deleteComment,
    saveUserProgress,
} from './../utils/reimport.js';
import jwt from 'jsonwebtoken';
import {secretJWT} from './authHandlers.js';


export async function setLike(req,res){
    let token = req.headers.authorization;
    let userID = jwt.decode(token, secretJWT).id;

    let {bookid, like} = req.body;

    let result;
    if (like){
        result= await addLikeBook(userID,bookid);
    }else{
        result= await cancelLikeBook(userID,bookid);
    }

    res.send(result);
}
export async function setReiting(req,res){
    let token = req.headers.authorization;

    let {bookid, reiting} = req.body;
    let userID = jwt.decode(token, secretJWT).id;

    let result = await userSetReiting(userID,bookid,reiting);

    res.send(result);
}
export async function addComment(req,res){
    let { bookid, commentData} = req.body;

    let result = await saveComment(bookid,commentData);

    res.send(result);
}
export async function removeComment(req,res){
    let { bookid, commentData} = req.body;

    let result = await deleteComment(bookid,commentData);
    
    res.send(result);
}
export async function setUserProgress(req,res){
    let token = req.headers.authorization;

    let {bookid, progress} = req.body;
    let userID = jwt.decode(token, secretJWT).id;
    let result = await saveUserProgress(userID,bookid,progress);

    res.send(result);
}
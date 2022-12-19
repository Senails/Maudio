import { ObjectId } from 'mongodb';
import {MongoColl,nameDB} from './MongoDB.js';
import {findBookById} from './Books.js';
import {findUserByID} from './Users.js';

export function addLikeBook(userid, bookid){
    return new Promise(async (res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let collBooks = db.collection('books');
            let collUsers = db.collection('users');

            let [user,book] = await Promise.all([findUserByID(userid),findBookById(bookid)]);

            if (user==='error' || book==='error') return res('error')

            if (user.Likelist){
                user.Likelist.push(bookid);
            }else{
                user.Likelist=[bookid];
            }

            if (book.popular){
                book.popular++;
            }else{
                book.popular=1;
            }

            try{
                let promise1 = collBooks.updateOne({_id: ObjectId(bookid)}, {$set: {...book}});
                let promise2 = collUsers.updateOne({_id: ObjectId(userid)}, {$set: {...user}});

                await Promise.all([promise1,promise2]);
            }catch{
                return res('error')
            }

            res('ok')
        })
    })
}
export function cancelLikeBook(userid, bookid){
    return new Promise(async (res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let collBooks = db.collection('books');
            let collUsers = db.collection('users');

            let [user,book] = await Promise.all([findUserByID(userid),findBookById(bookid)]);

            if (user==='error' || book==='error') return res('error')

            if (user.Likelist){
                user.Likelist= user.Likelist.filter((bookID)=>bookID!==bookid);
            }

            if (book.popular){
                book.popular--;
            }

            try{
                let promise1 = collBooks.updateOne({_id: ObjectId(bookid)}, {$set: {...book}});
                let promise2 = collUsers.updateOne({_id: ObjectId(userid)}, {$set: {...user}});

                await Promise.all([promise1,promise2]);
            }catch{
                return res('error')
            }

            res('ok')
        })
    })
}





export function userSetReiting(userid, bookid, reiting){
    return new Promise(async (res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let collBooks = db.collection('books');
            let collUsers = db.collection('users');

            let [user,book] = await Promise.all([findUserByID(userid),findBookById(bookid)]);
            if (user==='error' || book==='error') return res('error')

            if (!book.Reiting) book.Reiting=0;
            if (!book.Reitingcount) book.Reitingcount=0;
            if (!user.cansedArray) user.cansedArray={};
            
            if (user.cansedArray[bookid]){
                let reit = (book.Reiting*book.Reitingcount - user.cansedArray[bookid] + reiting)/book.Reitingcount;
                book.Reiting = reit;

                user.cansedArray[bookid]=reiting;
            }else{
                user.cansedArray[bookid]=reiting;

                let reit = (book.Reiting*book.Reitingcount + reiting)/(book.Reitingcount+1)
                book.Reiting = reit;
                book.Reitingcount++;
            }

            try{
                let promise1 = collBooks.updateOne({_id: ObjectId(bookid)}, {$set: {...book}});
                let promise2 = collUsers.updateOne({_id: ObjectId(userid)}, {$set: {...user}});

                await Promise.all([promise1,promise2]);
            }catch{
                return res('error')
            }

            res('ok')
        })
    })
}
export function saveComment(bookid,commentData){
    return new Promise(async (res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let collBooks = db.collection('books');

            let book = await findBookById(bookid);
            if (book==='error') return res('error')

            if (!book.comments) book.comments = [];
            book.comments.push(commentData);

            if (book.comments.lenght>100){
                book.comments = book.comments.slice(1);
            }

            try {
                await collBooks.updateOne({_id: ObjectId(bookid)}, {$set: {...book}});
            }catch{
                return res('error')
            }

            res('ok')
        })
    })
}
export function deleteComment(bookid,commentData){
    return new Promise(async (res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let collBooks = db.collection('books');

            let book = await findBookById(bookid);
            if (book==='error') return res('error')
            if (!book.comments) return res('ok');

            let {username, date} = commentData;

            book.comments = book.comments.filter((comment)=>{
                if (comment.username === username && comment.date === date ) return false;
                return true;
            });

            try {
                await collBooks.updateOne({_id: ObjectId(bookid)}, {$set: {...book}});
            }catch{
                return res('error')
            }

            res('ok')
        })
    })
}
export function saveUserProgress(userid, bookid, progress){
    return new Promise(async (res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let collUsers = db.collection('users');

            let user = await findUserByID(userid);
            if (user==='error') return res('error')

            if (!user.progressArray) user.progressArray = {};
            user.progressArray[bookid]=progress;

            try{
                await collUsers.updateOne({_id: ObjectId(userid)}, {$set: {...user}});
            }catch{
                return res('error')
            }

            res('ok')
        })
    })
}
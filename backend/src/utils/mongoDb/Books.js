import { ObjectId } from 'mongodb';
import {findUserByID} from './Users.js';
import {MongoColl,nameDB} from './MongoDB.js';
import {filterBooksBySearch} from '../reimport.js';

//books
export async function addBookToDB(book){
    return new Promise(async(res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('books');

                let href = book.href;
                let num1 =0;
                let ResHref=href;

                let check1 = await checkBookOnDB(href);
                if (check1===true){
                    while (check1===true){
                        num1++;
                        ResHref = href+num1;
                        check1 = await checkBookOnDB(ResHref);
                    }
                }

                let name = book.name;
                let num2 =0;
                let ResName=name;

                let check2 = await checkBookNameOnDB(ResName);
                if (check2===true){
                    while (check2===true){
                        num2++;
                        ResName = name+' '+num2;
                        check2 = await checkBookNameOnDB(ResName);
                    }
                }

                let NewBook = book;
                NewBook.href=ResHref;
                NewBook.name=ResName;
                NewBook.modified=Date.now();

                await coll.insertOne(NewBook);

                res('ok');
            }catch(e){
                res('error');
            }
        })
    })
}
export async function updateBookToDB(book,prevhref){
    return new Promise(async(res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('books');
                let prevbook = await findBookByHref(prevhref);
                let ResHref=book.href;
                let ResName=book.name;

                if (ResHref!==prevbook.href){
                    let href = book.href;
                    let num1 = 0;
                    ResHref=href;

                    let check1 = await checkBookOnDB(href);
                    if (check1===true){
                        while (check1===true){
                            num1++;
                            ResHref = href+num1;
                            check1 = await checkBookOnDB(ResHref);
                        }
                    }
                }
                if (ResName!==prevbook.name){
                    let name = book.name;
                    let num2 =0;
                    ResName=name;

                    let check2 = await checkBookNameOnDB(ResName);
                    if (check2===true){
                        while (check2===true){
                            num2++;
                            ResName = name+' '+num2;
                            check2 = await checkBookNameOnDB(ResName);
                        }
                    }
                }

                let newData = book;
                newData.href=ResHref;
                newData.name=ResName;
                newData.modified=Date.now();

                await coll.updateOne({_id: prevbook._id}, {$set: {...newData}});

                res('ok');
            }catch(e){
                res('error');
            }
        })
    })
}
export async function removeBookOnDB(href){
    return new Promise(async(res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let collBook = db.collection('books');

                let check = await checkBookOnDB(href);
                if (check===false) return res('ok');
                let bookid = (await findBookByHref(href))._id.toString();

                await collBook.deleteOne({href: href});
                removeBookFromMemory(bookid);

                res('ok');
            }catch{
                res('error');
            }
        })
    })
}
export async function findBookByHref(href){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('books');

                let needbook = await coll.findOne({href:href})
                res(needbook);
            }catch{
                res('error');
            }
        })
    })
}
export async function findBookById(id){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('books');

                let needbook = await coll.findOne({_id:ObjectId(id)})
                res(needbook);
            }catch{
                res('error');
            }
        })
    })
}


export async function findBookMapa(href, userID){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            let book = await findBookByHref(href);
            if (!book) return res('error');
            let bookid = book._id.toString();

            if (!userID){
                res(book);
                return;
            }

            let user = await findUserByID(userID);
           
            if (user.progressArray[bookid]){
                book.progress=user.progressArray[bookid];
            }

            res(book)
        })
    })
}
export async function findBookData(href, userID){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let collBook = db.collection('books');

            let book = await collBook.findOne({href:href});
            if (!book) return res('error');
            delete book.collections;

            let bookid = book._id.toString();

            if (!userID){
                res(book);
                return;
            }

            let user = await findUserByID(userID);

            if (user.Likelist[bookid]){
                book.like = true;
            }
            if (user.cansedArray[bookid]){
                book.userReiting = user.cansedArray[bookid];
            }
            if (user.progressArray[bookid]){
                book.progress = user.progressArray[bookid];
            }
           
            res(book)
        })
    })
}
export async function findBooksDataWithParams(sorting , filter , search, userID){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let coll = db.collection('books');

            //сортировка
            let sortObj = {modified:-1};
            if (sorting==='по популярности'){
                sortObj = {
                    popular:-1,
                    modified:-1
                };
            }
            if (sorting==='по рейтингу'){
                sortObj = {
                    Reiting:-1,
                    modified:-1
                };
            }
            let proj = {
                href: 1,
                name:1,
                authtorname: 1,
                image:1,
                Reiting:1,
            };
            let arraybooks = await coll.find().sort(sortObj).project(proj).toArray();
            if (!arraybooks) return res('error');
            //фильтр по названию
            if (search!==''){
                arraybooks = filterBooksBySearch(arraybooks,search);
            }
            //отдать если нет токена
            if (!userID){
                res(arraybooks);
                return;
            }
            //добавить данные юзера
            let user = await findUserByID(userID);
            arraybooks = arraybooks.map((book)=>{
                let bookID = book._id.toString();
                if (user.Likelist[bookID]){
                    book.like=true;
                }
                if (user.progressArray[bookID]){
                    book.progress=user.progressArray[bookID];
                }
                return book;
            })
            //фильтрация если нужна
            if (filter && filter!=='все'){
                arraybooks = arraybooks.filter((book)=>{
                    if (filter==='любимые' && book.like){
                        return true
                    }
                    if (filter==='уже слушал' && book.progress){
                        return true
                    }

                    return false;
                })
            }
            //end
            res(arraybooks)
        })
    })
}

////////////
async function checkBookOnDB(hrefName){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let coll = db.collection('books');

            let one = await coll.findOne({href: hrefName});
    
            if (one!==null) return res(true);
            return res(false);
        })
    })
}
async function checkBookNameOnDB(name){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            let db = mongo.db(nameDB);
            let coll = db.collection('books');

            let one = await coll.findOne({name: name});
            
            if (one!==null) return res(true);
            return res(false);
        })
    })
}
async function removeBookFromMemory(bookid){
    MongoColl(async (mongo)=>{
        let db = mongo.db(nameDB);
        let collUser = db.collection('users');

        let proekcia = {
            Likelist:1,
            cansedArray:1,
            progressArray:1,
        }
        let usersArray = await collUser.find().project(proekcia).toArray();

        usersArray.forEach((user) => {
            let flag = false;
            if (user.Likelist && user.Likelist[bookid]){
                delete user.Likelist[bookid];
                flag = true;
            }
            if (user.cansedArray && user.cansedArray[bookid]){
                delete user.cansedArray[bookid];
                flag = true;
            }
            if (user.progressArray && user.progressArray[bookid]){
                delete user.progressArray[bookid];
                flag = true;
            }
            if (flag){
                collUser.updateOne({_id: user._id}, {$set: {...user}});
            }
        });
    })
}

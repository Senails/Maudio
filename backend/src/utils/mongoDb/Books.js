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
                let coll = db.collection('books');

                let check = await checkBookOnDB(href);
                if (check===false) return res('ok');
                await coll.deleteOne({href: href});
                res('ok');
            }catch{
                res('error');
            }
        })
    })
}
export async function findBooksBySearch(search){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('books');

                let arraybooks = await coll.find().toArray();
                let needbooks = filterBooksBySearch(arraybooks,search);
        
                res(needbooks);
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

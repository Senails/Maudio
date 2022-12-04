import { BookMapFetch, FetchBook, Fetchbookpart, FetchCollection, fetchImage } from "../../types/api"
import { EditBook, Editbookpart, EditCollection, EditImage, EditState } from "../../types/editSlice"
import { Book, bookpart, Collection, Seria } from "../../types/pleerSlice"
import { calculateBookCount } from "../EditPage/calculateBookCount"
import { calculateBookLenth } from "../EditPage/calculateBookLength"

export function editMapToApiMap(editState: EditState):BookMapFetch{
    let mainImage:fetchImage = {
        url:editState.bookImage.url,
        googleid:editState.bookImage.googleid,
    }
    let apicollections: FetchCollection[] = editState.collections
    .map((coll)=>{
        let apibooks:FetchBook[]= coll.books.
        map((book)=>{
            let apibookparts: Fetchbookpart[] = book.bookparts
            .map((part)=>{
                let apipart:Fetchbookpart={
                    name:part.name,
                    id:part.id,
                    lenght:part.lenght,
                    url:part.url,
                    googleid:part.googleid,
                    size:part.size,
                }
                return apipart;
            })

            let apiimage:fetchImage = {
                url:book.image.url,
                googleid:book.image.googleid,
            }

            let apibook:FetchBook={
                name:book.name,
                booklength:calculateBookLenth(book),
                image:apiimage,
                bookparts: apibookparts,
            }
            return apibook
        })

        let apicoll:FetchCollection = {
            name:coll.name,
            books:apibooks,
        }
        return apicoll;
    })

    let reqBody:BookMapFetch = {
        href: createHrefName(editState.collName),
        name: editState.collName,
        authtorname: editState.authtorName,
        bookcount: calculateBookCount(editState),
        image: mainImage,
        description: editState.description,
        collections:apicollections,
    }
    return reqBody;
}
export function ApiMapToEditMap(json:BookMapFetch):EditState{
    let collections:EditCollection[]=json.collections
    .map((fetchcoll:FetchCollection)=>{
        let books:EditBook[]=fetchcoll.books
        .map((fetchbook:FetchBook)=>{
            let bookparts: Editbookpart[]=fetchbook.bookparts
            .map((fetchpart:Fetchbookpart)=>{
                let part:Editbookpart={
                    name:fetchpart.name,
                    id:fetchpart.id,
                    lenght:fetchpart.lenght,
                    url:fetchpart.url,
                    googleid:fetchpart.googleid,
                    size:fetchpart.size,
                    status: (fetchpart.size===0 && fetchpart.lenght===0)?'error':'loadend',
                }
                return part;
            })
            let image: EditImage={
                url:fetchbook.image.url,
                googleid:fetchbook.image.googleid,
                status:'loadend'
            }
            let book:EditBook={
                name:fetchbook.name,
                image,
                bookparts,
                show:false,
            }
            return book;
        })
        let coll:EditCollection={
            name:fetchcoll.name,
            books,
        }
        return coll;
    })

    let bookImage:EditImage={
        url:json.image.url,
        googleid:json.image.googleid,
        status:'loadend',
    }
    let editState: EditState = {
        href: json.href,
        collName:json.name,
        authtorName:json.authtorname,
        description:json.description,
        bookImage,
        collections,
        removeOnCancel:[],
        removeOnSave:[],
        loading:false,
        abortControler:null,
    }
    return editState;
}
export function bookMapToSeria(map:BookMapFetch):Seria{
    let colls:Collection[]=map.collections
    .filter(checkCollonNull)
    .map((fetchColl:FetchCollection)=>{
        let books:Book[]=fetchColl.books
        .filter(checkBookonNull)
        .map((fetchBook:FetchBook)=>{
            let bookparts:bookpart[]=fetchBook.bookparts
            .map((FetchPart:Fetchbookpart)=>{
                let bookpart:bookpart={
                    lenght:FetchPart.lenght,
                    url:FetchPart.url,
                }
                return bookpart;
            })

            let book:Book = {
                name:fetchBook.name,
                image:fetchBook.image.url,
                booklength:fetchBook.booklength,
                bookparts,
            }
            return book;
        })
        let coll:Collection={
            name:fetchColl.name,
            books,
        }
        return coll;
    })

    let seria: Seria = {
        name:map.name,
        description:map.description,
        authtor:map.authtorname,
        collections: colls,
    }
    return seria;
}

export function allFilesToRemoveList(editState: EditState):string[]{
    let removeList =[];

    removeList.push(editState.bookImage.googleid);
    editState.collections
    .forEach((coll)=>{
        coll.books
        .forEach((book)=>{
            removeList.push(book.image.googleid);
            book.bookparts
            .forEach((part)=>{
                removeList.push(part.googleid);
            })
        })
    })

    return removeList;
}

function checkCollonNull(coll:FetchCollection){
    for(let book of coll.books){
        if (book.bookparts.length>0){
            return true;
        }
    }
    return false;
}

function checkBookonNull(book:FetchBook){
    if (book.bookparts.length>0){
        return true;
    }
    return false;
}

export function createHrefName(name:string):string{
    type charObj={
        [key:string]:string
    }

    let obj:charObj = {
        'а':'a',
        'б':'b',
        'в':'v',
        'г':'g',
        'д':'d',
        'е':'e',
        'ё':'io',
        'ж':'zh',
        'з':'z',
        'и':'i',
        'й':'i',
        'к':'k',
        'л':'l',
        'м':'m',
        'н':'n',
        'о':'o',
        'п':'p',
        'р':'r',
        'с':'s',
        'т':'t',
        'у':'u',
        'ф':'f',
        'х':'h',
        'ц':'c',
        'ч':'ch',
        'ш':'sh',
        'щ':'sh',
        'Ъ':'',
        'ы':'i',
        'ь':'',
        'э':'e',
        'ю':'u',
        'я':'ya',
    }

    let charArray = name.split('');
    let newArr=[];

    for(let char of charArray){
        if (char===' '){
            newArr.push('');
        }else if (!obj[char.toLowerCase()]){ 
            newArr.push(char);
        }else if (char.toLowerCase()===char){
            newArr.push(obj[char])
        }else{
            newArr.push(obj[char.toLowerCase()].toUpperCase())
        }
    }

    let rez = newArr.join('');

    return rez;
}
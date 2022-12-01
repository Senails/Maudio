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
                    id:fetchpart.id,
                    lenght:fetchpart.lenght,
                    url:fetchpart.url,
                    googleid:fetchpart.googleid,
                    size:fetchpart.size,
                    status:'loadend',
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

export function createHrefName(name:string):string{
    return 'nnfghf';
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
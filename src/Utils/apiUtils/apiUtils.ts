import { BookMapFetch, FetchBook, Fetchbookpart, FetchCollection, fetchImage } from "../../types/api"
import { EditState } from "../../types/editSlice"

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
                booklength:book.booklength,
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
        bookcount: editState.bookcount,
        image: mainImage,
        description: editState.description,
        collections:apicollections,
    }
    return reqBody;
}

export function createHrefName(name:string):string{

    return 'nnfghf';
}
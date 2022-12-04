import { EditBook } from "../../types/editSlice";

export function calculateBookLenth(book:EditBook){
    let parts = book.bookparts;
    let bookLength = 0;

    parts.forEach((part)=>{
        bookLength+=part.lenght;
    })

    return bookLength;
}
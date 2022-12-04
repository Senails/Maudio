import { EditState } from "../../types/editSlice";

export function calculateBookCount(state:EditState){
    let colls = state.collections;
    let bookcount = 0;

    colls.forEach((coll)=>{
        coll.books.forEach((book)=>{
            if (book.bookparts.length>0){
                bookcount++;
            }
        })
    })

    return bookcount;
}
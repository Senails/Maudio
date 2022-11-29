import { EditState } from "../../types/editSlice";

export function calculateBookCount(state:EditState){
    let colls = state.collections;
    let bookcount = 0;

    colls.forEach((coll)=>{
        bookcount+=coll.books.length;
    })

    return bookcount;
}
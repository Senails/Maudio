import { store } from "../../redux/store";

export function getnextbook(){
    let {seria ,activecollection:activecoll,activebook }=store.getState().pleer;

    let nextbook = seria.collections[activecoll].books[activebook+1];
    if (nextbook!==undefined) return {
        coll: activecoll,
        book: activebook+1,
    }
    return {
        coll: activecoll+1,
        book: 0,
    }
}
export function getprevbook(){
    let {seria ,activecollection:activecoll,activebook }=store.getState().pleer;

    let prevbook = seria.collections[activecoll].books[activebook-1];
    if (prevbook!==undefined) return {
        coll: activecoll,
        book: activebook-1,
    }
    return {
        coll: activecoll-1,
        book: seria.collections[activecoll-1].books.length-1,
    }
}
import { Seria } from "../../redux/slices/pleerSlice";

export function getnextbook(seria:Seria,activecoll:number,activebook:number){
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
export function getprevbook(seria:Seria,activecoll:number,activebook:number){
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
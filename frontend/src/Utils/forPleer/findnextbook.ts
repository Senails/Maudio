import { pleerState } from "../../types/pleerSlice";

export function findnextbook(state:pleerState){
    let activebook = state.activebook;
    let activecoll = state.activecollection;

    let nextbook = state.seria.collections[activecoll].books[activebook+1];
    if (nextbook!==undefined) return {
        coll: activecoll,
        book: activebook+1,
    }
    let nextcoll = state.seria.collections[activecoll+1];
    if (nextcoll!==undefined) return {
        coll: activecoll+1,
        book: 0,
    }
    return {
        coll: -1,
        book: -1,
    }
}
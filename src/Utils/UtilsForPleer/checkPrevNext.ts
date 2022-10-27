import { store } from "../../redux/store";

export function checkprevbook(){
    let {seria, activecollection, activebook}= store.getState().pleer;

    let nextbook = seria.collections[activecollection].books[activebook-1];
    if (nextbook!==undefined) return true;
    let nextcolection = seria.collections[activecollection-1];
    if (nextcolection!==undefined) return true;
    return false;
}

export function checknextbook(){
    let {seria, activecollection, activebook}= store.getState().pleer;

    let nextbook = seria.collections[activecollection].books[activebook+1];
    if (nextbook!==undefined) return true;
    let nextcolection = seria.collections[activecollection+1];
    if (nextcolection!==undefined) return true;
    return false;
}
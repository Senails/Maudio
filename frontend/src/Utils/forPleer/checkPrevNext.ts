import { store } from "../../redux/store";
import { Seria } from "../../types/pleerSlice";

type propsType = {
    seria:Seria,
    activecollection:number,
    activebook:number,
}


export function checkprevbook({seria, activecollection, activebook}:propsType){
    let nextbook = seria.collections[activecollection].books[activebook-1];
    if (nextbook!==undefined) return true;
    let nextcolection = seria.collections[activecollection-1];
    if (nextcolection!==undefined) return true;
    return false;
}

export function checknextbook({seria, activecollection, activebook}:propsType){
    let nextbook = seria.collections[activecollection].books[activebook+1];
    if (nextbook!==undefined) return true;
    let nextcolection = seria.collections[activecollection+1];
    if (nextcolection!==undefined) return true;
    return false;
}
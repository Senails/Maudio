import { EditBook } from "../../types/editSlice";

export function getstoplist(succesList:string[],id:string,ArrayFiles:{file: File,partID: string}[]){
    let list = ArrayFiles.filter((obj)=>{
        if (obj.partID!==id && !succesList.includes(obj.partID)) return true;
        return false;
    }).map((obj)=>obj.partID);                                                        

    return list
}

export function checkContainFragment(book:EditBook,id:string):boolean{
    let flag = false; 

    for(let part of book.bookparts){
        if (part.id===id) return true;
    }

    return flag;
}
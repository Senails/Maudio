import { Editbookpart } from "../../types/editSlice";

export function checkLoading(bookparts: Editbookpart[]):string{
    let status = 'loadend';

    for(let part of bookparts){
        if (part.status==='error'){
            status='error';
            return status;
        }
    }

    for(let part of bookparts){
        if (part.status==='loading'|| part.status==='waitloading'){
            status='loading';
            return status;
        }
    }

    return status;
}
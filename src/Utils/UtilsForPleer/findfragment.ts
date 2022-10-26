import { Book } from "../../redux/slices/pleerSlice";

export function FindFragment(bookmap:Book,lenght:number){
    let {bookparts} = bookmap;

    let alllenght = 0;
    bookparts.forEach((e)=>alllenght+=e.lenght);

    if (lenght>=alllenght){
        return {
            src: bookparts[bookparts.length-1].url,
            lenght: bookparts[bookparts.length-1].lenght,
            activeFragment:bookparts.length-1,
        }
    }

    let mathlenght = lenght;
    let part =0;
    while (true){
        if ((mathlenght-bookparts[part].lenght)<0){
            break;
        }else{
            mathlenght-=bookparts[part].lenght
            part++;
        }
    }

    let result = {
        src: bookparts[part].url,
        lenght: mathlenght,
        activeFragment:part,
    }

    return result;
}
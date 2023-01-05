import { saveProgres } from "../../api/bookActions/saveProgres";
import { changebook, UserSelectLenght } from "../../redux/slices/pleerSlice";
import { dispatch, store } from "../../redux/store";
import { Collection } from "../../types/pleerSlice";
import { getTimeControl } from "../other/timecontrol";

let TimeControl = getTimeControl(30000);

export function saveUserProgress(){
    TimeControl(()=>{
        let state = store.getState();
        let colls = state.pleer.seria.collections;

        let allLenght = colls.reduce((sum, coll) => sum + coll.lenght,0);

        let sumlenghtnow=0;
        colls.forEach((coll,i)=>{
            if (state.pleer.activecollection>i){
                sumlenghtnow+=coll.lenght;
            }else if (state.pleer.activecollection===i){
                let beforelenght = coll.books[state.pleer.activebook].beforelenght;
                let lenght = state.pleer.lenght;

                sumlenghtnow+=beforelenght;
                sumlenghtnow+=lenght;
            }else return;
        })


        let bookid = state.pleer.seria._id;
        let token = state.user.token;
        let progress = sumlenghtnow/allLenght;

        saveProgres(bookid,token,progress);
    })
}

export function setUserProgress(progress:number){
    let state = store.getState();
    let colls = state.pleer.seria.collections;

    let {CollNum,BookNum,lenght} = findPosition(colls,progress);

    dispatch(changebook({coll:CollNum,book:BookNum}));
    dispatch(UserSelectLenght(lenght));
}

function findPosition(colls:Collection[],progress:number):{CollNum:number,BookNum:number,lenght:number}
{
    let allLenght = colls.reduce((sum, coll) => sum + coll.lenght,0);
    let needlenght = allLenght*progress;

    let collnum = 0;
    let accum1 = 0;

    while (true){
        if (needlenght<(colls[collnum].lenght+accum1)){
            break;
        }
        accum1+=colls[collnum].lenght;
        collnum++;
    }

    let lenghtInColl = needlenght-accum1;
    let books = colls[collnum].books

    let booknum = 0;
    let accum2 = 0;

    while (true){
        if (lenghtInColl<(books[booknum].booklength+accum2)){
            break;
        }
        accum2+=books[booknum].booklength;
        booknum++;
    }

    let lenghtInBook = lenghtInColl-accum2;


    return {
        CollNum:collnum,
        BookNum:booknum,
        lenght:lenghtInBook,
    }
}
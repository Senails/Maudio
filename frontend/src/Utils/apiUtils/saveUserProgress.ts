import { saveProgres } from "../../api/bookActions/saveProgres";
import { store } from "../../redux/store";
import { getTimeControl } from "../other/timecontrol";

let TimeControl = getTimeControl(10000);

export function saveUserProgress(){
    TimeControl(()=>{
        let state = store.getState();
        let colls = state.pleer.seria.collections;

        let allLenght = colls
        .reduce((sum, coll) => sum + coll.lenght,0);

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
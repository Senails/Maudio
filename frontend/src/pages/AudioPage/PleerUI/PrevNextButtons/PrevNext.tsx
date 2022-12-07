import { changebook } from "../../../../redux/slices/pleerSlice";
import { dispatch, useAppSelector } from "../../../../redux/store";
import { checknextbook, checkprevbook } from "../../../../Utils/forPleer/checkPrevNext";
import { getnextbook, getprevbook } from "../../../../Utils/forPleer/getNextPrev";

export function PrevNextButtons(){
    let seria = useAppSelector((state)=>state.pleer.seria);
    let activecollection = useAppSelector((state)=>state.pleer.activecollection);
    let activebook = useAppSelector((state)=>state.pleer.activebook);

    function clicknext(){
        if (!checknextbook({seria, activecollection, activebook})) return;
        let props = getnextbook();
        dispatch(changebook(props));
    }
    function clickprev(){
        if (!checkprevbook({seria, activecollection, activebook})) return;
        let props = getprevbook();
        dispatch(changebook(props));
    }
    
    return <>
        <div onClick={clickprev}  className={`prevbook prevnext ${checkprevbook({seria, activecollection, activebook})?'':'opacity'}`}></div>
        <div onClick={clicknext} className={`nextbook prevnext ${checknextbook({seria, activecollection, activebook})?'':'opacity'}`}></div>
    </>
}
import { useNavigate } from "react-router-dom";
import { changebook } from "../../../redux/slices/pleerSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { checknextbook, checkprevbook } from "../../../Utils/forPleer/checkPrevNext";
import { getnextbook, getprevbook } from "../../../Utils/forPleer/getNextPrev";

export function NextPrevbook(){
    let name = useAppSelector(state=>state.pleer.bookMap.name);
    let seria = useAppSelector(state=>state.pleer.seria);
    let activecollection = useAppSelector(state=>state.pleer.activecollection);
    let activebook = useAppSelector(state=>state.pleer.activebook);

    let href = useAppSelector(state=>state.pleer.hrefparam);
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

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

    return <div className='book-change-box'>
    <div onClick={clickprev} className={`left-arrow ${checkprevbook({seria, activecollection, activebook})?'':'opacity'}`}></div>
    <div onClick={()=>navigate(`/listen/${href}`)} className='book-name-box'>{name}</div>
    <div onClick={clicknext} className={`right-arrow ${checknextbook({seria, activecollection, activebook})?'':'opacity'}`}></div>
</div>
}
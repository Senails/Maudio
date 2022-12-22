import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookMap } from "../../api/getbookmap";
import { Loader } from "../../components/Loader/Loader";
import { setAllState } from "../../redux/slices/pleerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setUserProgress } from "../../Utils/apiUtils/saveUserProgress";
import { Book } from "./book/Book";
import LeftPanel from "./leftPanel/LeftPanel";
import { PleerUI } from "./PleerUI/Pleer";
import './style.scss';

export default function AudioPage(){
    let dispatch = useAppDispatch();
    let hrefparam = useAppSelector((state)=>state.pleer.hrefparam);

    let navigate = useNavigate();
    let {bookname} = useParams();
    let [loadend,setloadend]= useState(false);

    useEffect(()=>{
        onload()
    },[]);

    async function onload(){
        if (bookname===hrefparam){
            setloadend(true);
            return;
        }
        try{
            let data = await getBookMap(bookname!);
            if (data!=='error'){
                dispatch(setAllState({seria:data, hrefparam: bookname!}));
                if (data.progress){
                    setUserProgress(data.progress);
                }
                setloadend(true);
                return;
            }else{
                navigate('/404page');
            }
        }catch{
            navigate('/404page')
        }
    }

    return <div className={`AudioPage ${loadend?'':'loading'}`}>
        {loadend?
        <>
            <span className="audiobooks-audiopage"><Link to={'/'}>Audiobooks</Link></span>
            <Book/>
            <PleerUI/>
            <LeftPanel/>
        </>
        :<Loader/>}
    </div>
}
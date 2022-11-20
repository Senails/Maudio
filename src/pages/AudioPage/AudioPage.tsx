import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getBookMap } from "../../api/getbookmap";
import { Loader } from "../../components/Loader/Loader";
import { setAllState } from "../../redux/slices/pleerSlice";
import { useAppDispatch } from "../../redux/store";
import { Book } from "./book/Book";
import LeftPanel from "./leftPanel/LeftPanel";
import { PleerUI } from "./PleerUI/Pleer";
import './style.scss';

export default function AudioPage(){
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let {bookname} = useParams();
    let[loadend,setloadend]= useState(false);

    useEffect(()=>{
        onload()
        async function onload(){
            try{
                let data = await getBookMap(bookname!);
                if (data!=='error'){
                    dispatch(setAllState(data));
                    setloadend(true);
                }else{
                    navigate('/404page');
                }
            }catch{
                navigate('/404page')
            }
        }
    },[]);

    return <div className={`AudioPage ${loadend?'':'loading'}`}>
        {loadend?
        <>
            <span className="audiobooks-audiopage"><Link to={'/'}>AudioBooks</Link></span>
            <Book/>
            <PleerUI/>
            <LeftPanel/>
        </>
        :<Loader/>}
    </div>
}
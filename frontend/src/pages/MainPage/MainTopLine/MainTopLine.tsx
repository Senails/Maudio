import { useNavigate } from "react-router-dom";
import { setsearch } from "../../../redux/slices/searchSlice";
import { exitUser, showhidemodal } from "../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { SaveToken } from "../../../Utils/appData/GetSaveToken";
import './style.scss';


export function MainTopLine(){
    let dispatch = useAppDispatch();
    let navigate = useNavigate();

    let searchString = useAppSelector((state)=>state.search.searchString);
    let status = useAppSelector((state)=>state.user.userstatus);
    let isAuth = useAppSelector((state)=>state.user.isAuth);

    function addiconclick(){
        navigate('/edit/newbook');
    }

    function loginiconclick(){
        if (!isAuth){
            dispatch(showhidemodal(true));
        }
    }

    function exitclick(){
        dispatch(exitUser());
        dispatch(setsearch('*'));
        dispatch(setsearch(''));
        SaveToken('');
    }

    return <div className='main-top-line'>
    <p className="textLogo">Audiobooks</p>
    <div className='main-input'>
        <input type="text" value={searchString} onChange={(e)=>dispatch(setsearch(e.target.value))} placeholder='введите название или автора'/>
        <div className='input-icon'></div>
    </div>
    {(status==='admin' || status==='editor')?
    <div onClick={addiconclick} className='addbook-icon'>
        <div></div>
        <div></div>
    </div>:<></>}
    <div onClick={loginiconclick} className={`login-icon ${isAuth?'isAuth':''}`}>
        {isAuth?<div onClick={exitclick} className="exit-account">выйти</div>:<></>}
    </div>
</div>
}
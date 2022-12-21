import './style.scss';
import {useNavigate} from 'react-router-dom';
import { ProgressLine } from './ProgressLine/ProgressLine';
import { LikeHeart } from './likeHeart/LikeHeart';
import React from 'react';
import { showMessage } from '../../../Utils/other/showMessage/showMessahe';
import { StarIcon } from './StarIcon/StarIcon';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { userlike } from '../../../redux/slices/searchSlice';
 
type props = {
    _id:string;
    href:string;
    img:string;
    authtor:string;
    name:string;
    num:number;
    progress?:number;
    like?:boolean;
    reit?:number;
}

export function BookCard(propsParam:props){
    let {img,authtor,name,progress,href,reit,like,num,_id} = propsParam;

    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    let isAuth = useAppSelector((state)=>state.user.isAuth);

    const divStyle = {
        backgroundImage: `url(${img})`,
    };

    function onheartClick(event:React.MouseEvent){
        event.stopPropagation();
        if (isAuth){
            dispatch(userlike({_id,num,like:!like}));
        }else{
            showMessage(event,'авторизуйтесь');
        }
    }

    return <div className={`book-card ${like?'like':''}`} onClick={()=>navigate(`/bookInfo/${href}`)}>
        <div className='book-image book'></div>
        <div className='book-image' style={divStyle}></div>

        <h2>{name}</h2>
        <p>{authtor}</p>

        <StarIcon reit={reit}/>
        <LikeHeart like={like?like:false} onClick={onheartClick}/>
        {progress?<ProgressLine progress={progress}/>:<></>}
    </div>
}
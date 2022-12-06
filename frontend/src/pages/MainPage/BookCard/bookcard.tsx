import './style.scss';
import {useNavigate} from 'react-router-dom';
import { ProgressLine } from './ProgressLine/ProgressLine';
import { LikeHeart } from './likeHeart/LikeHeart';
import React, { useState } from 'react';
 
type props = {
    href:string;
    img:string;
    bookcount:number;
    authtor:string;
    name:string;
    progress?:number;
    like?:boolean;
}


export function BookCard({img,bookcount,authtor,name,href}:props){
    let navigate = useNavigate();
    let progress = 33;

    let [like,setlike]=useState(false);

    const divStyle = {
        backgroundImage: `url(${img})`,
    };

    function onheartClick(event:React.MouseEvent){
        event.stopPropagation();
        setlike(!like);
    }

    return <div className={`book-card`} onClick={()=>navigate(`/bookInfo/${href}`)}>
        <div className='book-image book'></div>
        <div className='book-image' style={divStyle}></div>


        <LikeHeart like={like} onClick={onheartClick}/>
        {progress?<ProgressLine progress={progress}/>:<></>}
    </div>
}
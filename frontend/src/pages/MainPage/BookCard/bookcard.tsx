import './style.scss';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setsearch } from '../../../redux/slices/searchSlice';
import React from 'react';
 
type props = {
    href:string;
    img:string;
    bookcount:number;
    authtor:string;
    name:string;
}


export function BookCard({img,bookcount,authtor,name,href}:props){
    let navigate = useNavigate();

    const divStyle = {
        backgroundImage: `url(${img})`,
    };

    return <div className='book-card' onClick={()=>navigate(`/bookInfo/${href}`)}>
        <div className='book-image book'></div>
        <div className='book-image' style={divStyle}></div>
        <p className='serias-name'>{name}</p>
        <p className='authtor-name'>{authtor}</p>
        <span className='book-count'>
            {bookcount} 
            <div className='book-icon'></div>
        </span>
    </div>
}
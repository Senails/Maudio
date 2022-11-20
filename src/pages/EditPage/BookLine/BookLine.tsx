import { useState } from 'react';
import { changebookname, removebook } from '../../../redux/slices/EditSlice';
import { useAppDispatch } from '../../../redux/store';
import { bookpart } from '../../../types/pleerSlice';
import './style.scss';

type props = {
    numcoll: number,
    numbook:number,
    name:string,
    image:string;
    bookparts: bookpart[];
}

export function Bookline({numcoll,numbook,name,bookparts}:props){
    let dispatch = useAppDispatch();
    let [show,setshow]=useState(false);

    return <div className={`edit-book-line`}>
        <div className='book-block'>
            <input type="text" value={name} onChange={(event)=>dispatch(changebookname({Collnum: numcoll, Booknum:numbook, newName:event.target.value}))}/>
            <div className='symb'></div>
            <div className='delete' onClick={()=>dispatch(removebook({Collnum: numcoll, Booknum:numbook}))}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
        </div>
    </div>
}
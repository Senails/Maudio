import { useEffect, useRef, useState } from 'react';
import { addbook, changecollname, removecoll, showHideColl } from '../../../redux/slices/EditSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { EditBook } from '../../../types/editSlice';
import { getheight } from '../../../Utils/EditPage/calcSizes';
import { moveHandler } from '../../../Utils/EditPage/dropHand';
import { AddFragment } from '../AddFragment/AddFragment';
import { Bookline } from '../BookLine/BookLine';
import './style.scss';

type props = {
    num: number,
    name:string,
    books: EditBook[],
}

export function CollLine({num,name,books}:props){
    let dispatch = useAppDispatch();
    let showColl = useAppSelector((state)=>state.edit.showColl);
    let showBook = useAppSelector((state)=>state.edit.showBook);
    let loading = useAppSelector((state)=>state.edit.loading);

    let dpopElement = useAppSelector((state)=>state.edit.dpopElement);
    let dpopType = useAppSelector((state)=>state.edit.dpopType);

    let [renderbooks,setrenderbooks]=useState(false);
    let timoutID = useRef<NodeJS.Timeout|null>(null);
    useEffect(()=>{
        if (timoutID.current) clearTimeout(timoutID.current);
        if (showColl===num){
            setrenderbooks(true);
        }else{
            timoutID.current = setTimeout(()=>{
                setrenderbooks(false);
            },300);
        }
    },[showColl,num]);

    let arraybooks=renderbooks?books.map((elem,index)=>{
        return <Bookline
        image={elem.image}
        bookparts={elem.bookparts}
        name={elem.name}
        numcoll={num}
        numbook={index}
        key={index}
        show={showColl===num && showBook===index}
        canMove={showBook===-1}
        />
    }):<></>;


    return <div className={`edit-collection-line ${showColl===num?'show':''}`}>
        <div className={`coll-block ${(dpopType==='coll'&& dpopElement===num)?'dropImpOpacity':''}`}>
            <input type="text" value={name} onChange={(event)=>dispatch(changecollname({num,name:event.target.value}))}/>
            <div className='symb' onClick={()=>dispatch(showHideColl(num))}></div>
            <div className='delete' onClick={()=>dispatch(removecoll(num))}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
            <div onMouseDown={(showColl===-1 && !loading)?(event)=>{moveHandler(event,'coll',num)}:()=>{}} className={`change-position ${(showColl===-1 && !loading)?'active':''}`}></div>
        </div>
        <div className='array-books' style={{height: getheight(books,showBook)}}>
            {arraybooks}
            <AddFragment onClick={()=>{dispatch(addbook(num))}}/>
        </div>
    </div>
}


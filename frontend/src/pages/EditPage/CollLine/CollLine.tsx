import { useEffect, useMemo, useState } from 'react';
import { addbook, changecollname, removecoll, showHideColl } from '../../../redux/slices/EditSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { EditBook } from '../../../types/editSlice';
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

    let show = showColl===num;
    let [rendering,setrendering] = useState(false);

    useEffect(()=>{
        if (num===showColl){
            setrendering(true);
        }else{
            setTimeout(() => {
                setrendering(false);
            }, 300);
        }
    },[showColl]);

    let arraybooks =rendering?books.map((elem,index)=>{
        return <Bookline
        image={elem.image}
        bookparts={elem.bookparts}
        name={elem.name}
        numcoll={num}
        numbook={index}
        key={index}
        />
    }):<></>;

    let Height = useMemo(getheight,[books,showBook]);
    let arrayBooksStyle={
        height: Height,
    }

    function getheight(){
        let sum = 45;

        books.forEach((elem,index)=>{
            if (index===showBook){
                let num1 = elem.bookparts.length;
                let num2 = 45+(num1>=9?10:num1+1)*45;
                sum+=num2;
            }else{
                sum+=45;
            }
        })

        return sum+'px';
    }

    return <div className={`edit-collection-line ${show?'show':''}`}>
        <div className='coll-block'>
            <input type="text" value={name} onChange={(event)=>dispatch(changecollname({num,name:event.target.value}))}/>
            <div className='symb' onClick={()=>dispatch(showHideColl(num))}></div>
            <div className='delete' onClick={()=>dispatch(removecoll(num))}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
        </div>
        <div className='array-books' style={arrayBooksStyle}>
            {arraybooks}
            <AddFragment onClick={()=>{dispatch(addbook(num))}}/>
        </div>
    </div>
}
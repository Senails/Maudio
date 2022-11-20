import { useState } from 'react';
import { addbook, changecollname, removecoll } from '../../../redux/slices/EditSlice';
import { useAppDispatch } from '../../../redux/store';
import { Book } from '../../../types/pleerSlice';
import { AddFragment } from '../AddFragment/AddFragment';
import { Bookline } from '../BookLine/BookLine';
import './style.scss';

type props = {
    num: number,
    name:string,
    books: Book[],
}

export function CollLine({num,name,books}:props){
    let dispatch = useAppDispatch();
    let [show, setshow]= useState(false);

    let arraybooks = books.map((elem,index)=>{
        return <Bookline
        image={elem.image}
        bookparts={elem.bookparts}
        name={elem.name}
        numcoll={num}
        numbook={index}
        key={index}
        />
    });

    let arrayBooksStyle={
        height:`${(arraybooks.length+1)*45}px`,
    }

    return <div className={`edit-collection-line ${show?'show':''}`}>
        <div className='coll-block'>
            <input type="text" value={name} onChange={(event)=>dispatch(changecollname({num,name:event.target.value}))}/>
            <div className='symb' onClick={()=>setshow(!show)}></div>
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
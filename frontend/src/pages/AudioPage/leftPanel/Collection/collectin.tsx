import { useEffect, useState } from 'react';
import { RootState, useAppSelector } from '../../../../redux/store';
import { Book } from '../../../../types/pleerSlice';
import BookPanel from '../bookpanel/BookPanel';
import './style.scss';

type Props = {
    name:string;
    numColl:number;
    books: Book[];
    collLenght:number,
}

export default function Collection({name , books, numColl,collLenght}:Props){
    let activeColl= useAppSelector((state)=>state.pleer.activecollection);
    let activeBook= useAppSelector((state)=>state.pleer.activebook);
    let lenght = useAppSelector((state:RootState)=>state.pleer.lenght);

    let [show,setshow] = useState(activeColl===numColl?true:false);

    let arrbooks = books.map((elem,i)=>{
        return <BookPanel
            name={elem.name}
            collNum={numColl}
            bookNum={i}
            key={i}
        />
    })

    useEffect(()=>{
        if (activeColl===numColl){
            setshow(true);
        }else{
            setshow(false);
        }
    },[activeColl])

    return <div className={`collection-div`}>
        <div onClick={()=>setshow(!show)} className={`collection-box ${activeColl===numColl?'active':''}`}>
            <p>{name}</p>
            <div className='collection-line'>
                <div className='white-line' 
                style={{width: `${activeColl>numColl?100:activeColl<numColl?0:((books[activeBook].beforelenght+lenght)/collLenght*100)}%`}}></div>
            </div>
        </div>
        <div className={`book-box`} style={{height:`${show?(books.length*40)+0:0}px`,opacity: `${show?1:0}`}}>
            {arrbooks}
        </div>
    </div>
}
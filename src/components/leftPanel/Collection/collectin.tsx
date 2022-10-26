import { useEffect, useState } from 'react';
import { Book } from '../../../redux/slices/pleerSlice';
import { RootState, useAppSelector } from '../../../redux/store';
import BookPanel from '../bookpanel/BookPanel';
import './style.scss';

type Props = {
    name:string;
    activeColl:number;
    activeBook:number;
    numColl:number;
    books: Book[];
}

export default function Collection({name , activeColl , books, numColl ,activeBook}:Props){
    let lenght = useAppSelector((state:RootState)=>state.pleer.lenght);
    let [show,setshow] = useState(activeColl===numColl?true:false);

    let arrbooks = books.map((elem,i)=>{
        let active = '';
        if (activeBook===i && activeColl===numColl) active='active';

        let collandbook = {
            activecoll:activeColl,
            coll:numColl,
            book:i,
            activeBook:activeBook,
        }

        return <BookPanel
            name={elem.name}
            isactive={active}
            CollAndBook={collandbook}
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

    let openlength = books.length*40+5;
    let styleforbooks = {
        height:`${show?openlength:0}px`,
        opacity: `${show?1:0}`,
    }
    let styleforline = {
        width: `${getwidth()}%`,
    }

    function getwidth(){
        let needwidth=activeColl>numColl?100:activeColl<numColl?0:calculatewidth();

        return needwidth;
        function calculatewidth(){
            let sumAll=0;
            let sum=0;

            books.forEach((book,i)=>{
                sumAll+=book.booklength;
                if (i<activeBook){
                    sum+=book.booklength;
                }else if (i===activeBook){
                    sum+=lenght;
                }
            })

            return sum/sumAll*100
        }
    }

    return <div className={`collection-div`}>
        <div onClick={()=>setshow(!show)} className={`collection-box ${activeColl===numColl?'active':''}`}>
            <p>{name}</p>
            <div className='collection-line'>
                <div className='white-line' style={styleforline}></div>
            </div>
        </div>
        <div className={`book-box`} style={styleforbooks}>
            {arrbooks}
        </div>
    </div>
}
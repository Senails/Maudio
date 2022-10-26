import { useEffect, useState } from 'react';
import { Book } from '../../../redux/slices/pleerSlice';
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
        width: `${getneedwidth()}%`,
    }

    function getneedwidth(){
        let width=30;
        let needwidth=activeColl>numColl?100:activeColl<numColl?0:width;

        return needwidth;
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
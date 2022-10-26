import { RootState, useAppSelector } from '../../../redux/store';
import './style.scss';


type Props = {
    name:string;
    isactive:string;
    CollAndBook:{
        activecoll:number,
        coll:number,
        book:number,
        activeBook:number,
    }
}

export default function BookPanel({name,isactive,CollAndBook}:Props) {
    let lenght= useAppSelector((state:RootState)=>state.pleer.lenght);
    let Alllenght= useAppSelector((state:RootState)=>state.pleer.bookMap.booklength);

    let { coll, book, activecoll,activeBook }=CollAndBook;

    let styleforline = {
        width: `${getwidth()}%`,
    }
    function getwidth(){
       if (activecoll>coll) return 100;
       if (activecoll<coll) return 0;
       if (activeBook>book) return 100;
       if (activeBook<book) return 0;
       
       return (lenght/Alllenght)*100;
    }

    return <div className={`book-panel-box ${isactive}`}>
        <p>{name}</p>
        <div className='line-box'>
            <div className='white-line' style={styleforline}></div>
        </div>
    </div>
}
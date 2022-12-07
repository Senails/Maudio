import { changebook } from '../../../../redux/slices/pleerSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../../../redux/store';
import './style.scss';


type Props = {
    name:string;
    collNum:number,
    bookNum:number,
}

export default function BookPanel({name, collNum, bookNum}:Props){
    let lenght= useAppSelector((state:RootState)=>state.pleer.lenght);
    let Alllenght= useAppSelector((state:RootState)=>state.pleer.bookMap.booklength);
    let activecoll= useAppSelector((state)=>state.pleer.activecollection);
    let activeBook= useAppSelector((state)=>state.pleer.activebook);
    let dispatch = useAppDispatch();

    let isactive = (activeBook===bookNum && activecoll===collNum)?'':'';

    function getwidth(){
       if (activecoll>collNum) return 100;
       if (activecoll<collNum) return 0;
       if (activeBook>bookNum) return 100;
       if (activeBook<bookNum) return 0;
       
       return (lenght/Alllenght)*100;
    }

    return <div onClick={()=>{dispatch(changebook({coll:collNum,book:bookNum}))}} className={`book-panel-box ${isactive}`}>
        <p>{name}</p>
        <div className='line-box'>
            <div className='white-line' style={{width: `${getwidth()}%`}}></div>
        </div>
    </div>
}
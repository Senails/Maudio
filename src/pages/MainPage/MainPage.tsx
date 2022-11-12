import { useEffect, useRef } from 'react';
import { BookCardtype, loadmore, setsearch,  } from '../../redux/slices/searchSlice';
import { useAppSelector,RootState, dispatch} from '../../redux/store';
import { checkLoadMore } from '../../Utils/forMainPage/checkLoadMore';
import { BookCard } from './BookCard/bookcard';
import './style.scss';


export default function MainPage(){
    let {arrayCard , searchString } = useAppSelector((state:RootState)=>state.search);
    let bookCardBox = useRef<HTMLDivElement>(null);


    useEffect(()=>{
        if (checkLoadMore(bookCardBox)){
            dispatch(loadmore())
        }

        return ()=>{

        }
    },[]);


    return <div className="MainPage">
        <div className='main-input'>
            <input type="text" value={searchString} onChange={(e)=>dispatch(setsearch(e.target.value))} placeholder='введите название книги или автора'/>
            <div className='input-icon'></div>
        </div>
        <div ref={bookCardBox} className='bookcard-box'>
            {arrayCard.map((book:BookCardtype,index:number)=>{
                return <BookCard 
                href={book.href}
                img={book.img}
                bookcount={book.bookcount} 
                authtor={book.authtor} 
                name={book.name}
                key={index}
                />
            })}
        </div>
    </div>
}
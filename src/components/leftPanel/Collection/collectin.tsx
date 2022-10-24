import { Book } from '../../../redux/slices/pleerSlice';
import BookPanel from '../bookpanel/BookPanel';
import './style.scss';

type Props = {
    name:string;
    activeColl:string;
    books: Book[];
}

export default function Collection({name , activeColl , books}:Props){
    let arrbooks = books.map((elem,i)=>{
        return <BookPanel
            name={elem.name}

            key={i}
        />
    })




    return <div className={`collection-div`}>
        <div className={`collection-box ${activeColl}`}>
            <p>{name}</p>
            <div className='collection-line'>
                <div className='white-line'></div>
            </div>
        </div>
        <div className={`book-box`}>
            {arrbooks}
        </div>
    </div>
}
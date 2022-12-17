import { useAppSelector } from "../../../../redux/store"

export function Line3(){
    let authtor = useAppSelector((state)=>state.bookinfo.authtor);
    let bookcount = useAppSelector((state)=>state.bookinfo.bookcount);

    return <div className='line3'>
        <span>{authtor}</span>
        <span> {bookcount}
            <div className="book-icon"></div>
        </span>
    </div>
}
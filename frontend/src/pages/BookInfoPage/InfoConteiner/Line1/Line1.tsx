import { useAppSelector } from "../../../../redux/store";
import { BookHeart } from "./BookHeart/BookHeart";
import { ReitingStarts } from "./reitStars/ReitingStars";

export function Line1(){
    let {name} = useAppSelector((state)=>state.bookinfo)

    return <div className='line1'>
        <span className='bookname'>{name}</span>
        <BookHeart/>
        <ReitingStarts/>
    </div>
}
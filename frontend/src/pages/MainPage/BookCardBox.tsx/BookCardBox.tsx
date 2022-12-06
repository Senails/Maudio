import { useRef } from "react";
import { FilterBlock } from "../FilterBlock/FilterBlock";
import { ArrauBooks } from "./ArrayBooks/ArrayBooks";
import './style.scss';


export function BookCardBox(){
    let bookCardBox = useRef<HTMLDivElement>(null);

    return <div ref={bookCardBox} className='bookcard-box'>
        <FilterBlock/>
        <ArrauBooks/>
    </div>
}
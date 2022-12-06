import { useEffect, useState } from "react";
import { getArrayBooks } from "../../../../api/getarraybooks";
import { Loader } from "../../../../components/Loader/Loader";
import { BookCardtype, setArrayCard } from "../../../../redux/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { getTimeControl2 } from "../../../../Utils/other/timecontrol";
import { BookCard } from "../../BookCard/bookcard";

let timeControl = getTimeControl2(1000);

export function ArrauBooks(){
    let dispatch = useAppDispatch();
    
    let searchString= useAppSelector((state)=>state.search.searchString);
    let arrayCard = useAppSelector((state)=>state.search.arrayCard);
    let status = useAppSelector((state)=>state.user.userstatus);

    
    let[loadend,setloadend]= useState(false);
    useEffect(()=>{
        timeControl(searchbooks);
        async function searchbooks(){
            setloadend(false);
            let array = await getArrayBooks(searchString);
            if (array!=='error'){
                setloadend(true);
                dispatch(setArrayCard(array));
            }else{
                setloadend(true);
                dispatch(setArrayCard([]));
            }
        }
    },[searchString,status]);


    return <>{loadend?<>
        {(arrayCard.length>0)?
        <div className="array-card-conteiner">
            {arrayCard.map((book:BookCardtype,index:number)=>{
            return <BookCard 
            href={book.href}
            img={book.img}
            bookcount={book.bookcount} 
            authtor={book.authtor} 
            name={book.name}
            key={index}
            />})}
        </div>
        :<div className='message'>
            <span>{`Аудиокнижки не найдены :(`}</span>
            <span>{`попробуйте немного позже`}</span> 
        </div>}
    </>:<Loader/>}</>
}
import { useEffect, useRef, useState } from 'react';
import './style.scss';

type props = {
    imageurl:string;
}

export function Book({imageurl}:props){
    let [flag , setflag] =useState(false);
    let [move,setmove]=useState(false);
    let img1 = useRef<HTMLDivElement>(null);
    let img2 = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if (!flag){
            img1.current!.style.backgroundImage=`url(${imageurl})`;
            img2.current!.classList.add('small');
            setflag(true)
        }else{
            img2.current!.style.backgroundImage=`url(${imageurl})`;
            img1.current!.classList.add('small');
            img2.current!.classList.remove('small');
            setmove(true)

            setTimeout(()=>{
                img1.current!.style.backgroundImage=`url(${imageurl})`;
                img1.current!.classList.remove('small');

                setTimeout(()=>{
                    setmove(false)
                    img2.current!.classList.add('small');
                },0)
            },1000)
        }
    },[imageurl])

    return <div className='book_box'>
        <div className={'book_box_move '+(move?'change':'')}>
            <div className='book_box_conteiner'>
                <div ref={img2} className='img'></div>
            </div>
            <div className='book_box_conteiner'>
                <div ref={img1} className='img'></div>
            </div>
        </div>
        <div className='book_box_shadow'></div>
    </div>
}
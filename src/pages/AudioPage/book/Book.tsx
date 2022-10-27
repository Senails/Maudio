import { useEffect, useRef, useState } from 'react';
import { RootState, useAppSelector } from '../../../redux/store';
import { GetImageSrc } from '../../../Utils/getImageSrc';
import { sleep } from '../../../Utils/sleep';
import { getTimeControl } from '../../../Utils/timecontrol';
import './style.scss';


let TimeControl = getTimeControl(1200);

export function Book(){
    let image = useAppSelector((state:RootState)=>state.pleer.bookMap.image);
    let [flag , setflag] =useState(false);
    let [move,setmove]=useState(false);
    
    let img1 = useRef<HTMLDivElement>(null);
    let img2 = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        TimeControl(ChangeImage);
        async function ChangeImage(){
            let src = image;
            // let src = await GetImageSrc(image);

            if (!flag){
                img1.current!.style.backgroundImage=`url(${src})`;
                img2.current!.classList.add('small');
                setflag(true)
            }else{
                img2.current!.style.backgroundImage=`url(${src})`;
                img1.current!.classList.add('small');
                img2.current!.classList.remove('small');
                setmove(true)
    
                await sleep(1000);

                img1.current!.style.backgroundImage=`url(${src})`;
                img1.current!.classList.remove('small');
                setmove(false)

                await sleep(0);
                img2.current!.classList.add('small');
            }
        }
    },[image])

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
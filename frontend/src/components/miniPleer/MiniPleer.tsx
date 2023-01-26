import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { setplay, setshowmini } from '../../redux/slices/pleerSlice';
import { useAppDispatch, useAppSelector} from '../../redux/store';
import { MiniProgressLine } from './MiniProgresBar/MiniProgressLine';
import { NextPrevbook } from './nextprevbook/nextPrevBook';
import { MiniPlayPause } from './playpause/MiniPlayPause';
import './style.scss';

export function MiniPleer(){
    let dispatch = useAppDispatch();

    // let [show,setshow]=useState(false);
    let location = useLocation();
    let show2 = useAppSelector((state)=>state.pleer.showminipleer);
    

    let refular =/\/listen\//;
    let show = !refular.test(location.pathname);

    // useEffect(()=>{
    //     let observer = new MutationObserver(()=>{
    //         let href = document.location.href;
    //         let refular =/\/listen\//;
    //         if (refular.test(href)){
    //             setshow(false)
    //         }else{
    //             setshow(true)
    //         }
    //     });
    //     observer.observe(document.getElementById('App')!,{
    //         childList:true,
    //     })
    //     return ()=>{
    //         observer.disconnect();
    //     }
    // },[]);

    if (!show || !show2) return<></>;

    function closeclick(){
        dispatch(setplay('pause'));
        dispatch(setshowmini(false));
    }

    return <div className="mini-pleer">
        <MiniProgressLine/>
        <MiniPlayPause/>
        <NextPrevbook/>
        <div className='red-triangel'></div>
        <div onClick={closeclick} className='close'>
            <div className='close-w'></div>
            <div className='close-w'></div>
        </div>
    </div>
}

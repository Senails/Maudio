import React, { useEffect, useState } from 'react';
import { changebook, setpause, UserSelectVolume } from '../../../redux/slices/pleerSlice';
import { RootState, store, useAppDispatch, useAppSelector } from '../../../redux/store';

import { sleep } from '../../../Utils/sleep';
import { checknextbook, checkprevbook } from '../../../Utils/UtilsForPleer/checkPrevNext';
import { getnextbook, getprevbook } from '../../../Utils/UtilsForPleer/getNextPrev';
import ProgressBar from './progressbar/ProgressBar';
import Volumebar from './volumebar/VolumeBar';
import './style.scss';

let flag=false;

export function PleerUI(){
    let {playpause, userVolume, activecollection, activebook, seria} = useAppSelector((state:RootState)=>state.pleer);
    let name = useAppSelector((state:RootState)=>state.pleer.bookMap.name);
    let dispatch = useAppDispatch();
    let [play, setplay] = useState('pause');


    useEffect(()=>{
        if (!flag) return;
        effectPause();

        async function effectPause(){
            if (playpause==='pause'){
                setplay('hide play');
                await sleep(300);
                setplay('pause');
            }else{
                setplay('hide pause')
                await sleep(300);
                setplay('play');
            }
        }
    },[playpause]);

    useEffect(()=>{
        flag=true;
    },[]);

    async function PauseHendler(){
        if (playpause==='play'){
            dispatch(setpause('pause'));
        }else{
            dispatch(setpause('play'));
        }
    }

    function weelhandler(event: React.WheelEvent){
        if (event.ctrlKey) return;
        if (event.deltaY>=0){
            let Newvolume = userVolume-0.05;
            Newvolume=Math.round(Newvolume*100)/100;
            Newvolume= Newvolume<=0?0:Newvolume;
            dispatch(UserSelectVolume(Newvolume));
        }else{
            let Newvolume = userVolume+0.05;
            Newvolume=Math.round(Newvolume*100)/100;
            Newvolume= Newvolume>=1?1:Newvolume;
            dispatch(UserSelectVolume(Newvolume));
        }
    }

    function clicknext(){
        if (!checknextbook()) return;
        let props = getnextbook(seria,activecollection,activebook);
        dispatch(changebook(props));
    }
    function clickprev(){
        if (!checkprevbook()) return;
        let props = getprevbook(seria,activecollection,activebook);
        dispatch(changebook(props));
    }

    return <div className='pleer_layer'>
        <div className='pleer_box' onWheel={weelhandler}>
            <h1>{name}</h1>
            <div className='place' onClick={PauseHendler}>
                <div className={`play-pause ${play}`}></div>
            </div>
            <ProgressBar/>
            <div onClick={clickprev}  className={`prevbook prevnext ${checkprevbook()?'':'opacity'}`}></div>
            <div onClick={clicknext} className={`nextbook prevnext ${checknextbook()?'':'opacity'}`}></div>
        </div>
        <Volumebar/>
    </div>
}
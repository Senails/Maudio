import React, { useEffect, useState } from 'react';
import { setpause, UserSelectVolume } from '../../redux/slices/pleerSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { sleep } from '../../Utils/sleep';
import ProgressBar from './progressbar/ProgressBar';
import './style.scss';
import Volumebar from './volumebar/VolumeBar';

let flag=false;

export function PleerUI(){
    let {playpause, userVolume} = useAppSelector((state:RootState)=>state.pleer);
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

    return <div className='pleer_layer'>
        <div className='pleer_box' onWheel={weelhandler}>
            <h1>{name}</h1>
            <div className='place' onClick={PauseHendler}>
                <div className={`play-pause ${play}`}></div>
            </div>
            <ProgressBar/>
            <Volumebar/>
        </div>
    </div>
}
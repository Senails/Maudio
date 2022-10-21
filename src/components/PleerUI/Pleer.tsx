import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setpause, setvolume } from '../../redux/slices/pleerSlice';
import { RootState } from '../../redux/store';
import { sleep } from '../../Utils/sleep';
import ProgressBar from './progressbar/ProgressBar';
import './style.scss';

let flag=false;

export function PleerUI(){
    let {name,playpause} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
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

    return <div className='pleer_layer'>
        <div className='pleer_box'>
            <h1>{name}</h1>
            <div className='place' onClick={PauseHendler}>
                <div className={`play-pause ${play}`}></div>
            </div>
            <ProgressBar/>
        </div>
    </div>
}
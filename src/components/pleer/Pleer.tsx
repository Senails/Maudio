import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setpause } from '../../redux/slices/pleerSlice';
import { RootState } from '../../redux/store';
import { sleep } from '../../Utils/sleep';
import ProgressBar from './progressbar/ProgressBar';
import './style.scss';

export function Pleer(){
    let {name, playpause} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
    let [play, setplay] = useState('play');

    async function PauseHendler(){
        if (play==='play'){
            setplay('play hide');
            await sleep(300);
            setplay('pause');
            dispatch(setpause('pause'));
        }else if (play==='pause'){
            setplay('pause hide')
            await sleep(300);
            setplay('play');
            dispatch(setpause('play'));
        }
    }

    return <div className='pleer_layer'>
        <div className='pleer_box'>
            <h1>{name} {playpause}</h1>
            <div className='place' onClick={PauseHendler}>
                <div className={`play-pause ${play}`}></div>
            </div>
            <ProgressBar/>
        </div>
    </div>
}
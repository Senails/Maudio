import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setpause, setvolume } from '../../redux/slices/pleerSlice';
import { RootState } from '../../redux/store';
import { sleep } from '../../Utils/sleep';
import ProgressBar from './progressbar/ProgressBar';
import './style.scss';

export function PleerUI(){
    let {name,volume} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
    let [play, setplay] = useState('pause');

    async function PauseHendler(){
        if (play==='play'){
            setplay('play hide');
            ChangeVolume(0,300);

            await sleep(300);
            setplay('pause');
            dispatch(setpause('pause'));
        }else{
            setplay('pause hide')
            ChangeVolume(0.5,300);

            await sleep(300);
            setplay('play');
            dispatch(setpause('play'));
        }
    }

    async function ChangeVolume(NewVolume:number,ms:number) {
        let frames = Math.floor((ms/1000)*60);
        let period = Math.floor(ms/frames);

        let OldVolume = volume;

        let volumedelta = NewVolume-OldVolume;
        let volumepart = volumedelta/frames;

        let volumeNow = OldVolume;

        for(let i=0; i<frames;i++){
            await sleep(period);
            volumeNow=volumeNow+volumepart;
            volumeNow= volumeNow<0?0:volumeNow

            dispatch(setvolume(volumeNow));
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
import { useEffect, useState } from "react";
import { setpause } from "../../../../redux/slices/pleerSlice";
import { dispatch, RootState, useAppSelector } from "../../../../redux/store";
import { sleep } from "../../../../Utils/other/sleep";


export function PlayButton(){
    let playpause = useAppSelector((state:RootState)=>state.pleer.playpause);
    let [play, setplay] = useState('pause');
    let [flag, setflag] = useState(false);

    useEffect(()=>{
        if (!flag){setflag(true);return;}
        effectPause();
        async function effectPause(){
            if (playpause==='pause'){
                setplay('hide play');
                await sleep(100);
                setplay('pause');
            }else{
                setplay('hide pause');
                await sleep(100);
                setplay('play');
            }
        }
    },[playpause]);

    async function PauseHendler(){
        if (playpause==='play'){
           dispatch(setpause('pause'));
        }else{
           dispatch(setpause('play'));
        }
    }
    return <>
        <div className='place' onClick={PauseHendler}>
            <div className={`play-pause ${play}`}></div>
        </div>
    </>
}
import { useEffect, useState } from "react";
import { setplay, setshowmini } from "../../../../redux/slices/pleerSlice";
import { dispatch, RootState, useAppSelector } from "../../../../redux/store";
import { sleep } from "../../../../Utils/other/sleep";
import { getTimeControl } from "../../../../Utils/other/timecontrol";

let timeControl = getTimeControl(500);

export function PlayButton(){
    let playpause = useAppSelector((state:RootState)=>state.pleer.playpause);
    let [play, setbutton] = useState<string>(playpause);
    let [flag, setflag] = useState(false);

    useEffect(()=>{
        if (!flag){setflag(true);return;}
        timeControl(effectPause);
        async function effectPause(){
            if (playpause==='pause'){
                setbutton('hide play');
                await sleep(100);
                setbutton('pause');
            }else{
                setbutton('hide pause');
                await sleep(100);
                setbutton('play');
            }
        }
    },[playpause]);

    async function PauseHendler(){
        if (playpause==='play'){
           dispatch(setplay('pause'));
        }else{
           dispatch(setplay('play'));
           dispatch(setshowmini(true));
        }
    }
    return <>
        <div className='place' onClick={PauseHendler}>
            <div className={`play-pause ${play}`}></div>
        </div>
    </>
}
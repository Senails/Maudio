import React, { useEffect, useRef } from "react";
import { ResolveError, setlenght, setnextFragment, setplay} from "../../redux/slices/pleerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { saveUserProgress } from "../../Utils/apiUtils/saveUserProgress";
import { getTimeControl3 } from "../../Utils/other/timecontrol";

let timecontrol = getTimeControl3(5,5000);

export default function AudioPl(){
    let isAuth = useAppSelector((state)=>state.user.isAuth);

    let playpause = useAppSelector((state)=>state.pleer.playpause);
    let volume = useAppSelector((state)=>state.pleer.volume);
    let pleerlenght = useAppSelector((state)=>state.pleer.pleerlenght);
    let activeSrc = useAppSelector((state)=>state.pleer.activeSrc);
    let dispatch = useAppDispatch();

    let audio = useRef<HTMLAudioElement>(null);

    function onerror(){
        timecontrol(()=>{dispatch(ResolveError())});
    }
    function onended(){
        let play = playpause;
        dispatch(setnextFragment());
        if (play!=='play'){
            dispatch(setplay('play'));
        }

        if (isAuth) saveUserProgress();
    }
    function ontimeupdate(event:React.BaseSyntheticEvent){
        dispatch(setlenght(event.currentTarget.currentTime));

        if (isAuth) saveUserProgress();
    }

    useEffect(()=>{
        if (playpause==='play'){
            audio.current!.play();
        }else {
            audio.current!.pause();
        }
    },[playpause]);
    useEffect(()=>{
        audio.current!.currentTime=pleerlenght;
    },[pleerlenght]);
    useEffect(()=>{
        audio.current!.volume=volume;
    },[volume]);
    useEffect(()=>{
        if (playpause==='play'){
            audio.current?.play();
        }
    },[activeSrc]);

    return <audio ref={audio} 
    onError={onerror}

    onEnded={onended}
    onTimeUpdate={ontimeupdate}

    src={activeSrc}
    autoPlay={playpause==='play'}
    loop={false}></audio>
}
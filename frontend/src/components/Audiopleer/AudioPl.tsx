import React, { useEffect, useRef } from "react";
import { ResolveError, setlenght, setnextFragment, setplay} from "../../redux/slices/pleerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { saveUserProgress } from "../../Utils/apiUtils/saveUserProgress";
import { getTimeControl2, getTimeControl3 } from "../../Utils/other/timecontrol";

let timecontrol = getTimeControl3(5,5000);
let timecontrolForPlay = getTimeControl2(300);

export default function AudioPl(){
    let isAuth = useAppSelector((state)=>state.user.isAuth);

    let playpause = useAppSelector((state)=>state.pleer.playpause);
    let volume = useAppSelector((state)=>state.pleer.volume);
    let pleerlenght = useAppSelector((state)=>state.pleer.pleerlenght);
    let activeSrc = useAppSelector((state)=>state.pleer.activeSrc);
    let dispatch = useAppDispatch();

    let audio = useRef<HTMLAudioElement>(null);

    function onerror(){
        console.log('on error');
        timecontrol(()=>{dispatch(ResolveError())});
    }
    function onended(){
        console.log('on ended')
        dispatch(setnextFragment());

        if (isAuth) saveUserProgress();
    }
    function ontimeupdate(event:React.BaseSyntheticEvent){
        console.log('on timeupdate')
        dispatch(setlenght(event.currentTarget.currentTime));

        if (event.currentTarget.currentTime>=event.currentTarget.duration){
            dispatch(setnextFragment());
        }

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
        timecontrolForPlay(()=>{
            let timoutID = setTimeout(()=>{
                audio.current!.play();
            },20);

            if (activeSrc!=='' && playpause==='play' && audio.current!.paused) return;
            clearTimeout(timoutID);
        })
    },[activeSrc]);
    useEffect(()=>{
        let intervalID = setInterval(()=>{
            document.body.click();
            // console.log('body click')
        },60000)

        return ()=>{
            clearInterval(intervalID);
        }
    },[]);

    return <audio ref={audio} 
    onError={onerror}
    onStalled={onerror}

    onEnded={onended}
    onTimeUpdate={ontimeupdate}

    onPlay={()=>console.log('on play')}
    onPause={()=>console.log('on pause')}
    //12

    src={activeSrc}
    autoPlay={playpause==='play'}
    preload={"metadata"}
    loop={false}></audio>
}
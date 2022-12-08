import React, { useEffect, useRef, useState } from "react";
import { ResolveError, setlenght, setnextFragment, setplay} from "../../redux/slices/pleerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store"


export default function AudioPl(){
    let playpause = useAppSelector((state)=>state.pleer.playpause);
    let volume = useAppSelector((state)=>state.pleer.volume);
    let pleerlenght = useAppSelector((state)=>state.pleer.pleerlenght);
    let activeSrc = useAppSelector((state)=>state.pleer.activeSrc);
    let dispatch = useAppDispatch();

    let audio = useRef<HTMLAudioElement>(null);


    function onerror(){
        console.log('error')
        dispatch(ResolveError());
    }


    function onended(){
        let play = playpause;
        dispatch(setnextFragment())
        if (play!=='play'){
            dispatch(setplay('play'));
        }
        console.log('ended')
    }
    function ontimeupdate(event:React.BaseSyntheticEvent){
        dispatch(setlenght(event.currentTarget.currentTime))
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

    return <audio ref={audio} 
    onError={onerror}

    onEnded={onended}
    onTimeUpdate={ontimeupdate}
    src={activeSrc}
    autoPlay={playpause==='play'}
    loop={false}></audio>
}
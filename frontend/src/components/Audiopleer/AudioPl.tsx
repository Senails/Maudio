import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setlenght, setplay} from "../../redux/slices/pleerSlice";
import { RootState } from "../../redux/store"

let interval:NodeJS.Timer;

export default function AudioPl(){
    let {playpause,volume,pleerlenght,activeSrc,activebook,activecollection} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
    let audio = useRef<HTMLAudioElement>(null);


    useEffect(()=>{
        // console.log(pleerlenght);
        audio.current!.currentTime=pleerlenght;
        playhandler();

    },[pleerlenght,activebook,activecollection]);

    useEffect(()=>{
        playhandler();
    },[playpause]);

    useEffect(()=>{
        audio.current!.volume=volume;
    },[volume]);

    // useEffect(()=>{
    //     let audioTag = audio.current!;
    //     audioTag.addEventListener('play',play);
    //     audioTag.addEventListener('pause',pause);
    //     function play(){
    //         if (audioTag.currentTime<audioTag.duration){
    //             dispatch(setplay('play'));
    //         };
    //     }
    //     function pause(){
    //         if (audioTag.currentTime<audioTag.duration){
    //             dispatch(setplay('pause'));
    //         };
    //     }
    //     return ()=>{
    //         audioTag.removeEventListener('play',play);
    //         audioTag.removeEventListener('pause',pause);
    //     }
    // },[])

    async function playhandler(){
        if (playpause==='play'){
            audio.current!.play();
            dispatch(setlenght(audio.current!.currentTime));
            if (interval) clearInterval(interval);
            interval = setInterval(()=>{
                let now = audio.current!.currentTime;
                dispatch(setlenght(now));
            },100);

        }else{
            clearInterval(interval);
            audio.current!.pause();
        }
    }



    return <audio ref={audio} src={activeSrc} loop={false}></audio>
}
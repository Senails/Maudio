import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setlenght} from "../../redux/slices/pleerSlice";
import { RootState } from "../../redux/store"

let interval:NodeJS.Timer;

export default function AudioPl(){
    let {playpause,volume,pleerlenght,activeSrc} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
    let audio = useRef<HTMLAudioElement>(null);


    useEffect(()=>{
        audio.current!.currentTime=pleerlenght;
        playhandler();
    },[pleerlenght]);

    useEffect(()=>{
        playhandler();
    },[playpause]);

    useEffect(()=>{
        audio.current!.volume=volume;
    },[volume]);

    async function playhandler(){
        if (playpause==='play'){
            audio.current!.play();
            dispatch(setlenght(audio.current!.currentTime));
            if (interval) clearInterval(interval);
            interval = setInterval(()=>{
                let now = audio.current!.currentTime;
                dispatch(setlenght(now));
            },250);

        }else{
            clearInterval(interval);
            audio.current!.pause();
        }
    }

    return <audio ref={audio} src={activeSrc}></audio>
}
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setlenght} from "../../redux/slices/pleerSlice";
import { RootState } from "../../redux/store"

let interval:NodeJS.Timer;

export default function AudioPl(){
    let {playpause,volume,pleerlenght,activeSrc,activebook,activecollection} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
    let audio = useRef<HTMLAudioElement>(null);


    useEffect(()=>{
        audio.current!.currentTime=pleerlenght;
        playhandler();

        // console.log(pleerlenght);
    },[pleerlenght,activebook,activecollection]);
    //,activebook,activecollection


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

    function onerror(){
        console.log('pleer error')
    }

    return <audio ref={audio} src={activeSrc} onError={onerror} ></audio>
}
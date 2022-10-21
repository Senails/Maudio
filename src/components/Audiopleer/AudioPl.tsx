import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setlenght } from "../../redux/slices/pleerSlice";
import { RootState } from "../../redux/store"

let flag = false;
let interval:NodeJS.Timer;

export default function AudioPl(){
    let {playpause,volume} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
    let audio = useRef<HTMLAudioElement>(null);



    useEffect(()=>{
        playhandler();
        async function playhandler(){
            if (!flag) return;
            if (playpause==='play'){
                audio.current!.play();
                dispatch(setlenght(audio.current!.currentTime));

                interval = setInterval(()=>{
                    let now = audio.current!.currentTime;
                    dispatch(setlenght(now));
                },250);

            }else{
                clearInterval(interval);
                audio.current!.pause();
            }
        }

    },[playpause]);

    useEffect(()=>{
        volumehandler();
        async function volumehandler(){
            if (!flag) return;
            audio.current!.volume=volume;
        }

    },[volume]);


    useEffect(()=>{
        flag=true;audio.current!.volume=0.2;
    },[]);



    return <audio ref={audio} src={"./1245511.mp3"} hidden></audio>
}
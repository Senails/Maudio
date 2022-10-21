import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setlenght, setpause, setvolume } from "../../redux/slices/pleerSlice";
import { RootState } from "../../redux/store"
import { sleep } from "../../Utils/sleep";

let flag = false;
let interval:NodeJS.Timer;

export default function AudioPl(){
    let {playpause,volume,pleerselectlenght} = useSelector((state:RootState)=>state.pleer);
    let dispatch = useDispatch();
    let audio = useRef<HTMLAudioElement>(null);

    useEffect(()=>{
        if (!flag) return;
        audio.current!.currentTime=pleerselectlenght;
        dispatch(setlenght(pleerselectlenght));
    },[pleerselectlenght]);

    useEffect(()=>{
        if (!flag) return;
        playhandler();
        async function playhandler(){
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
        if (!flag) return;
        volumehandler();
        async function volumehandler(){
            audio.current!.volume=volume;
        }

    },[volume]);

    useEffect(()=>{
        flag=true;
        audio.current!.volume=0.2;
        audio.current!.addEventListener('ended',ended);

        function ended(){
            dispatch(setpause('pause'))
        }

        return ()=>{
            audio.current!.removeEventListener('ended',ended);
        }
    },[]);

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

    return <audio ref={audio} src={"./1245511.mp3"} loop={false} hidden></audio>
}
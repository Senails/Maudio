import React, { useRef, useState } from "react";
import { UserSelectLenght } from "../../../../redux/slices/pleerSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { numToTime } from "../../../../Utils/forPleer/numtotime";
import './style.scss';

let num = 0.001;

export default function ProgressBar(){
    let lenght = useAppSelector((state:RootState)=>state.pleer.lenght);
    let alllenght = useAppSelector((state:RootState)=>state.pleer.bookMap.booklength);
    let dispatch= useAppDispatch();

    let [hoverlenght,sethoverhoverlenght]=useState(0);
    let [UserControl,setUserControl]=useState(false);
    let showtime = useRef<HTMLSpanElement>(null);

    function startSelect(){
        setUserControl(true);
    }
    function endSelect(){
        if (UserControl){
            setUserControl(false);
            ResPolzik();
        }
    }
    function ResPolzik(){
        dispatch(UserSelectLenght(hoverlenght+num));
        if (num===0.001){
            num = 0.002;
        }else{
            num = 0.001;
        }
    }

    // контроль hoverlenght
    function mousemove(event:React.MouseEvent|React.TouchEvent,type:'touchpad'|'mouse'){
        let mouseleft:number;
        if (type ==='mouse'){
            mouseleft = (event as React.MouseEvent).pageX;
        }else{
            mouseleft = (event as React.TouchEvent).touches[0].pageX;;
        }
        let left= event.currentTarget.getBoundingClientRect().left;
        let allWidth = event.currentTarget.clientWidth;
        let spanWidth=showtime.current!.offsetWidth;

        requestAnimationFrame(()=>{
            let Needleft = mouseleft-left;
            if (Needleft<=0) Needleft=0;
            if (Needleft>=allWidth) Needleft=allWidth;

            let now = (Needleft-spanWidth/2)/allWidth;

            showtime.current!.style.left=(now*100).toFixed(2)+'%';
            let percent = Needleft/allWidth;
            let time = percent*alllenght;
            sethoverhoverlenght(time);
        })
    }

    let progressBar = <div className="progressBar-box"
        onTouchStart={startSelect} 
        onMouseDown={startSelect}
        
        onTouchEnd={endSelect}
        onMouseUp={endSelect}
        onMouseLeave={endSelect}
        
        onMouseMove={(event)=>{mousemove(event,'mouse')}} 
        onTouchMove={(event)=>{mousemove(event,'touchpad')}}>

        <span ref={showtime} className="show-time">{numToTime(hoverlenght)}</span>
        <div className='progressBar'>
            <div style={{width:`${(UserControl?hoverlenght:lenght)/alllenght*100}%`}}
            className='progressline'></div>
        </div>
        <span className='timecheck left'>{numToTime(lenght)}</span>
        <span className='timecheck right'>{numToTime(alllenght)}</span>
    </div>

    return <div className="progressbar-conteiner">
        {progressBar}
    </div>


}

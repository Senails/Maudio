import React, { useEffect, useRef, useState } from "react";
import { UserSelectLenght } from "../../../../redux/slices/pleerSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../../redux/store";
import { numToTime } from "../../../../Utils/UtilsForPleer/numtotime";
import './style.scss';

let num = 0.001;

export default function ProgressBar(){
    let {lenght , block , activebook,activecollection} = useAppSelector((state:RootState)=>state.pleer);
    let alllenght = useAppSelector((state:RootState)=>state.pleer.bookMap.booklength);
    let dispatch= useAppDispatch();

    let [UserControl,setUserControl]=useState(false);

    let showtime = useRef<HTMLSpanElement>(null);
    let polsunok = useRef<HTMLDivElement>(null);
    let progress = useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if (UserControl) return;
        let line = progress.current;

        let PercentLenght = lenght/alllenght;
        let NewWidth = Math.floor(PercentLenght*10000)/100;
        line!.style.width= `${NewWidth}%`;
    },[lenght,activebook,activecollection]);

    //управление ползунком
    useEffect(()=>{
        let polzik = polsunok.current;
        let line = progress.current;

        polzik!.addEventListener('mousedown',mousehandler);
        polzik!.addEventListener('touchstart',touchhandler);

        function mousehandler(event:MouseEvent){
            if (block) return;

            setUserControl(true);

            let startX = event.clientX;
            let {left} = polzik!.getBoundingClientRect();

            let allWhidth = polzik?.offsetWidth;
            let WidthLine = startX-left;
            let percentWhidth= Math.floor(WidthLine/allWhidth!*10000)/100;

            // let line:HTMLDivElement = polzik!.querySelector('.progressline')!;
            line!.style.width=percentWhidth+'%';

            document.addEventListener('mouseup',mouseup);
            document.addEventListener('mousemove',mousemove);
            function mousemove(e:MouseEvent){
                e.preventDefault()

                let nowX=e.clientX;
                let delta = nowX-startX;

                let resultWidth = WidthLine+delta;

                if (resultWidth<=0) resultWidth=0;
                if (resultWidth>=allWhidth!) resultWidth=allWhidth!;

                let percent = Math.floor(resultWidth/allWhidth!*10000)/100+'%';

                line!.style.width=percent;
            }

            function mouseup(){
                let percentvalue = line!.offsetWidth/polzik!.offsetWidth;
                ResPolzik(percentvalue);

                document.removeEventListener('mousemove',mousemove);
                document.removeEventListener('mouseup',mouseup);
                setUserControl(false);
            }
        }
        function touchhandler(event:TouchEvent){
            if (block) return;

            setUserControl(true);

            let startX = event.touches[0].clientX;
            let {left} = polzik!.getBoundingClientRect();

            let allWhidth = polzik?.offsetWidth;
            let WidthLine = startX-left;
            let percentWhidth= Math.floor(WidthLine/allWhidth!*10000)/100;


            line!.style.width=percentWhidth+'%';

            document.addEventListener('touchend',touchend);
            document.addEventListener('touchmove',touchmove);

            function touchmove(e:TouchEvent){
                let nowX=e.touches[0].clientX;
                let delta = nowX-startX;

                let resultWidth = WidthLine+delta;

                if (resultWidth<=0) resultWidth=0;
                if (resultWidth>=allWhidth!) resultWidth=allWhidth!;

                let percent = Math.floor(resultWidth/allWhidth!*10000)/100+'%';

                line!.style.width=percent;
            }

            function touchend(){
                let percentvalue = line!.offsetWidth/polzik!.offsetWidth;
                ResPolzik(percentvalue);

                document.removeEventListener('touchmove',touchmove);
                document.removeEventListener('touchend',touchend);

                setUserControl(false);
            }
        }

        return ()=>{
            polsunok.current!.removeEventListener('mousedown',mousehandler);
            polsunok.current!.removeEventListener('touchstart',touchhandler);
        }
    },[])

    function ResPolzik(PercetRes:number){
        let needLenght= alllenght*PercetRes;
        dispatch(UserSelectLenght(needLenght+num));
        if (num===0.001){
            num = 0.002;
        }else{
            num = 0.001;
        }
    }

    //подсказка времени
    function mousemove(event:React.MouseEvent){
        showtime.current!.classList.add('active');
        let mouseleft = event.pageX;
        let {left}= event.currentTarget.getBoundingClientRect();

        let allWidth = event.currentTarget.clientWidth;
        let spanWidth=showtime.current!.offsetWidth;

        let Needleft = mouseleft-left;
        if (Needleft<=0) Needleft=0;
        if (Needleft>=allWidth) Needleft=allWidth;

        let now = (Needleft-spanWidth/2)/allWidth;
        showtime.current!.style.left=(now*100).toFixed(2)+'%';

        let percent = Needleft/allWidth;
        let time = percent*alllenght;
        showtime.current!.innerHTML=numToTime(time);
    }
    function touchmove(event:React.TouchEvent){
        showtime.current!.classList.add('active');

        let mouseleft = event.touches[0].pageX;
        let {left}= event.currentTarget.getBoundingClientRect();

        let allWidth = event.currentTarget.clientWidth;
        let spanWidth=showtime.current!.offsetWidth;

        let Needleft = mouseleft-left;
        if (Needleft<=0) Needleft=0;
        if (Needleft>=allWidth) Needleft=allWidth;

        let now = (Needleft-spanWidth/2)/allWidth;
        showtime.current!.style.left=(now*100).toFixed(2)+'%';

        let percent = Needleft/allWidth;
        let time = percent*alllenght;
        showtime.current!.innerHTML=numToTime(time);
    }
    function mouseLeave(){
        showtime.current!.classList.remove('active');
    }
    function touchend(){
        showtime.current!.classList.remove('active');
    }

    return <div ref={polsunok} className="progressBar-box" onMouseMove={mousemove} onTouchMove={touchmove} onMouseLeave={mouseLeave} onTouchEnd={touchend}>
        <span ref={showtime} className="show-time"></span>
        <div className='progressBar'>
            <div ref={progress} className='progressline'></div>
        </div>
        <span className='timecheck left'>{numToTime(lenght)}</span>
        <span className='timecheck right'>{numToTime(alllenght)}</span>
    </div>
}

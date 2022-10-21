import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { numToTime } from "../../../Utils/numtotime";
import './style.scss';

export default function ProgressBar(){
    let {lenght , alllenght} = useSelector((state:RootState)=>state.pleer)
    let polsunok = useRef<HTMLDivElement>(null);
    let progress = useRef<HTMLDivElement>(null);


    useEffect(()=>{
        let line = progress.current;

        let PercentLenght = lenght/alllenght;
        let NewWidth = Math.floor(PercentLenght*10000)/100;
        line!.style.width= `${NewWidth}%`;
    },[lenght]);

    useEffect(()=>{
        let polzik = polsunok.current;
        let line = progress.current;

        polzik!.addEventListener('mousedown',mousehandler);
        polzik!.addEventListener('touchstart',touchhandler);

        function mousehandler(event:MouseEvent){
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
                console.log("mouseup");
                let percentvalue = line!.offsetWidth/polzik!.offsetWidth;
                ResPolzik(percentvalue);

                document.removeEventListener('mousemove',mousemove);
                document.removeEventListener('mouseup',mouseup);
            }
        }
        function touchhandler(event:TouchEvent){
            console.log(1);



            document.addEventListener('touchend',touchend);

            function touchend(){
                console.log("tochend");

                document.removeEventListener('touchend',touchend);
            }
        }


        function ResPolzik(PercetRes:number){
            console.log(PercetRes)
        }

        return ()=>{
            polsunok.current!.removeEventListener('mousedown',mousehandler);
            polsunok.current!.removeEventListener('touchstart',touchhandler);
        }
    },[])

    return <div className="progressBar-box">
        <div ref={polsunok} className='progressBar'>
            <div ref={progress} className='progressline'></div>
        </div>
        <span className='left'>{numToTime(lenght)}</span>
        <span className='right'>{numToTime(alllenght)}</span>
    </div>
}
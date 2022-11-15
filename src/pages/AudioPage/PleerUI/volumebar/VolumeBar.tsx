import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserSelectVolume } from '../../../../redux/slices/pleerSlice';
import { RootState, useAppSelector } from '../../../../redux/store';
import './style.scss';

let timoutID:NodeJS.Timeout;

export default function Volumebar(){
    let userVolume = useAppSelector((state:RootState)=>state.pleer.userVolume);
    let dispatch = useDispatch();

    let [changed,setchanged]= useState('');
    let [usercontrol,setusercontrol] = useState(false);
    let line = useRef<HTMLDivElement>(null);


    useEffect(()=>{
        if (usercontrol) return;
        line.current!.style.height=userVolume*100+'%';

        setchanged("changed");
        if (timoutID) clearTimeout(timoutID);
        timoutID = setTimeout(()=>{
            setchanged("");
        },2000);
    },[userVolume]);

    function muosedown(event:React.MouseEvent){
        let volumeline = line.current!;

        setusercontrol(true);
        let {top} = volumeline.parentElement!.getBoundingClientRect();
        let lineStart = Math.floor(top);
        let lineEnd = Math.floor(top)+volumeline.parentElement!.clientHeight;
        let delta = lineEnd - lineStart;
        setline(event);

        document.addEventListener('mousemove',mousemove);
        document.addEventListener('mouseup',mouseup);

        function mousemove(event:MouseEvent){
            setline(event);
        }

        function mouseup(e:MouseEvent){
            let res = volumeline.clientHeight/volumeline.parentElement!.clientHeight;
            resultUsing(res);

            document.removeEventListener('mousemove',mousemove);
            document.removeEventListener('mouseup',mouseup);
            setusercontrol(false);
        }

        function setline(e:React.MouseEvent|MouseEvent){
            let startY = e.clientY;
            let needHeight=delta-(startY-lineStart);
            needHeight = needHeight<=0?0:needHeight>=delta?delta:needHeight;
            needHeight = +(needHeight/delta*100).toFixed(2);
            volumeline.style.height=needHeight+'%';
        }
    }
    function touchstart(event:React.TouchEvent){
        let volumeline = line.current!;

        setusercontrol(true);
        let {top} = volumeline.parentElement!.getBoundingClientRect();
        let lineStart = Math.floor(top);
        let lineEnd = Math.floor(top)+volumeline.parentElement!.clientHeight;
        let delta = lineEnd - lineStart;
        setline(event);

        document.addEventListener('touchmove',touchmove);
        document.addEventListener('touchend',touchend);

        function touchmove(event:TouchEvent){
            setline(event);
        }

        function touchend(){
            let res = volumeline.clientHeight/volumeline.parentElement!.clientHeight;
            resultUsing(res);

            document.removeEventListener('touchmove',touchmove);
            document.removeEventListener('touchend',touchend);
            setusercontrol(false);
        }

        function setline(e:React.TouchEvent|TouchEvent){
            let startY = e.touches[0].clientY;
            let needHeight=delta-(startY-lineStart);
            needHeight = needHeight<=0?0:needHeight>=delta?delta:needHeight;
            needHeight = +(needHeight/delta*100).toFixed(2);
            volumeline.style.height=needHeight+'%';
        }
    }
    function resultUsing(res:number){
        dispatch(UserSelectVolume(res));
    }

    return <div className={`volume-box ${userVolume>0?'':'block'} ${changed} ch1anged`}>
        <div className='volume-icon'></div>
        <div className='volume-polzik'>
            <div className='volume-polzik-line'
                onMouseDown={muosedown}
                onTouchStart={touchstart}
                >
                <div ref={line} className='volume-line'>
                    <div className='circle'></div>
                </div>
            </div>
        </div>
        {/* <p>
            {userVolume}
        </p> */}
    </div>
}
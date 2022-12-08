import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserSelectVolume } from '../../../../redux/slices/pleerSlice';
import { RootState, useAppSelector } from '../../../../redux/store';
import './style.scss';

let timoutID:NodeJS.Timeout;

export default function Volumebar(){
    let userVolume = useAppSelector((state:RootState)=>state.pleer.userVolume);
    let dispatch = useDispatch();

    let [changed,setchanged]= useState('');

    useEffect(()=>{
        setchanged("changed");
        if (timoutID) clearTimeout(timoutID);
        timoutID = setTimeout(()=>{
            setchanged("");
        },2000);
    },[userVolume]);

    function muosedown(event:React.MouseEvent){
        let {top} = event.currentTarget.getBoundingClientRect();
        let lineStart = Math.floor(top);
        let lineEnd = Math.floor(top)+event.currentTarget.clientHeight;
        let delta = lineEnd - lineStart;
        setline(event);

        function setline(e:React.MouseEvent|MouseEvent){
            let needHeight=delta-(e.clientY-lineStart);
            needHeight = needHeight<=0?0:needHeight>=delta?delta:needHeight;
            let res = +(needHeight/delta).toFixed(4);
            dispatch(UserSelectVolume(res));
        }


        document.addEventListener('mousemove',mousemove);
        document.addEventListener('mouseup',mouseup);
        function mousemove(event:MouseEvent){
            requestAnimationFrame(()=>{
                setline(event);
            })
        }
        function mouseup(e:MouseEvent){
            document.removeEventListener('mousemove',mousemove);
            document.removeEventListener('mouseup',mouseup);
        }
    }
    function touchstart(event:React.TouchEvent){
        let {top} = event.currentTarget.getBoundingClientRect();
        let lineStart = Math.floor(top);
        let lineEnd = Math.floor(top)+event.currentTarget.clientHeight;
        let delta = lineEnd - lineStart;
        setline(event);

        function setline(e:React.TouchEvent|TouchEvent){
            let needHeight=delta-(e.touches[0].clientY-lineStart);
            needHeight = needHeight<=0?0:needHeight>=delta?delta:needHeight;
            let res = +(needHeight/delta).toFixed(4);
            dispatch(UserSelectVolume(res));
        }

        document.addEventListener('touchmove',touchmove);
        document.addEventListener('touchend',touchend);
        function touchmove(event:TouchEvent){
            requestAnimationFrame(()=>{
                setline(event);
            })
        }
        function touchend(){
            document.removeEventListener('touchmove',touchmove);
            document.removeEventListener('touchend',touchend);
        }
    }

    return <div className={`volume-box ${userVolume>0?'':'block'} ${changed}`}>
        <div className='volume-icon'></div>
        <div className='volume-polzik'>
            <div className='volume-polzik-line' 
            onMouseDown={muosedown} 
            onTouchStart={touchstart}>
                
                <div style={{height: userVolume*100+'%'}} className='volume-line'>
                    <div className='circle'></div>
                </div>
            </div>
        </div>
    </div>
}
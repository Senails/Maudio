import { sleep } from "../sleep";
import './style.scss';

export async function showMessage(event:React.MouseEvent,message:string){
    let span = document.createElement('span');
    span.classList.add('show-message-block');
    span.innerHTML=message;
    document.body.appendChild(span);
    //
    let Y = event.clientY;
    let pageY = event.pageY;
    let delta = pageY-Y;

    let X = event.clientX;
    let winH = window.innerHeight;
    let winW = window.innerWidth;
    let spanH=span.clientHeight;
    let spanW=span.clientWidth;

    if ((X-10)>spanW){
        span.style.left=`${X-10-spanW}px`;
    }else if ((winW-10-X)>spanW){
        span.style.left=`${X+10}px`;
    }else{
        span.style.left=`${10}px`;
    }

    if ((winH-10-Y-80)>spanH){
        span.style.top =`${10+Y+delta}px`;
    }else if ((Y-10)>spanH){
        span.style.top =`${Y-10-spanH+delta}px`;
    }else{
        span.style.top =`${10+delta}px`;
    }
    //
    await sleep(200);
    span.classList.add('opacity');
    await sleep(500);
    span.remove();
}
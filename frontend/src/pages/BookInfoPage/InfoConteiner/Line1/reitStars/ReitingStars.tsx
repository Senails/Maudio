import { useState } from 'react';
import { setUserReiting } from '../../../../../redux/slices/BookInfoSlice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { showMessage } from '../../../../../Utils/other/showMessage/showMessahe';
import './style.scss';



export function ReitingStarts(){
    let reiting = useAppSelector((state)=>state.bookinfo.reiting);
    let userreiting = useAppSelector((state)=>state.bookinfo.userreiting);
    let isAuth = useAppSelector((state)=>state.user.isAuth);

    let dispatch = useAppDispatch();

    let [hover,sethover] = useState(false);
    let [hoverreiting,sethoverreiting] = useState(0);

    function onclick(event:React.MouseEvent){
        sethover(false);

        if (!isAuth) return showMessage(event,'авторизуйтесь');

        let {left} = event.currentTarget.getBoundingClientRect();
        let X = event.clientX;
        let cense= Math.ceil((X-left)/event.currentTarget.clientWidth*5);
        dispatch(setUserReiting(cense));
    }
    function mouseleave(){
        sethover(false);
        sethoverreiting(0);
    }
    function mousemove(event:React.MouseEvent){
        sethover(true);

        let {left} = event.currentTarget.getBoundingClientRect();
        let X = event.clientX;
        let cense= Math.ceil((X-left)/event.currentTarget.clientWidth*5);
        sethoverreiting(cense);
    }
    function checshow(num:number){
        if (hover){
            if (hoverreiting>=num) return true;
            return false;
        }
        if (userreiting>=num) return true;
        return false;
    }

    return <div className="reiting-starts-box">
        <div className='box-fon'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className='box-fon2' style={{width:`${(reiting/5)*100}%`}}>
            <div className='box-fon'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div className='box-fon3'
            onClick={onclick}
            onMouseMove={mousemove}
            onMouseLeave={mouseleave}
            >

            <div className={`${checshow(1)?'active':''}`}></div>
            <div className={`${checshow(2)?'active':''}`}></div>
            <div className={`${checshow(3)?'active':''}`}></div>
            <div className={`${checshow(4)?'active':''}`}></div>
            <div className={`${checshow(5)?'active':''}`}></div>
        </div>
    </div>
}
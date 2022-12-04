import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { showhidemodal } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../redux/store';
import { sleep } from '../../Utils/other/sleep';
import { getTimeControl } from '../../Utils/other/timecontrol';
import { LoginConteiner } from './loginConteiner/LoginConteiner';
import './style.scss';

let timecontrol = getTimeControl(300);

export function LoginModal(){
    let dispatch = useDispatch();
    let acttimeModal = useAppSelector((state)=>state.user.acttimeModal);

    let [hide,sethide]=useState('hide');
    let [show,setshow]=useState(false);

    useEffect(()=>{
        timecontrol(()=>{
            activeModalHandler();
        })
    },[acttimeModal]);

    async function activeModalHandler() {
        if (acttimeModal){
            document.body.classList.add('block');
            setshow(true);
            await sleep(10);
            requestAnimationFrame(()=>sethide(''))
        }else{
            document.body.classList.remove('block');
            sethide('hide');
            await sleep(300);
            setshow(false);
        }
    }

    if (!show) return <></>;
    function clickonFon(event:React.MouseEvent){
        let path = event.nativeEvent.composedPath();
        let elem = document.querySelectorAll('.login-modal');
        
        if (!path.includes(elem[1])){
            dispatch(showhidemodal(false));
        }
    }

    return <div onClick={clickonFon} className={`login-modal-screen ${hide}`}>
        <LoginConteiner/>
    </div>
}
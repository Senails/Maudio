import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setErrorMessage, showhidemodal } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../redux/store';
import { sleep } from '../../Utils/other/sleep';
import { getTimeControl } from '../../Utils/other/timecontrol';
import { LoginConteiner } from './loginConteiner/LoginConteiner';
import './style.scss';

let timecontrol = getTimeControl(300);

export function LoginModal(){
    let dispatch = useDispatch();
    let acttimeModal = useAppSelector((state)=>state.user.acttimeModal);
    let loading = useAppSelector((state)=>state.user.loading);

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
        if (loading) return;

        let path = event.nativeEvent.composedPath();
        let elems = document.querySelectorAll('.login-modal');
        
        if (!path.includes(elems[1]) && !path.includes(elems[0])){
            dispatch(showhidemodal(false));
            dispatch(setErrorMessage(''));
        }
    }

    return <div onClick={clickonFon} className={`login-modal-screen ${hide}`}>
        <LoginConteiner/>
    </div>
}
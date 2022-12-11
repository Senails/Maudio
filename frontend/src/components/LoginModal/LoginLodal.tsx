import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/store';
import { sleep } from '../../Utils/other/sleep';
import { getTimeControl } from '../../Utils/other/timecontrol';
import { Login } from './Login/Login';
import { Registration } from './Registration/Registr';
import './style.scss';

let timeControll = getTimeControl(500);

export function LoginModal(){
    let acttimeModal = useAppSelector((state)=>state.user.acttimeModal);
    let isAuth = useAppSelector((state)=>state.user.isAuth);
    let [move,setmove]=useState(false);
    let [activemodal,setactivemodal]=useState(true);

    useEffect(()=>{
        if (acttimeModal){
            document.body.classList.add('block');
        }else{
            document.body.classList.remove('block');
        }
    },[acttimeModal]);

    if (!acttimeModal || isAuth) return <></>;

    async function changeModal(){
        timeControll(async()=>{
            setmove(true);
            await sleep(500);
            setactivemodal(!activemodal);
            setmove(false);
        })
    }

    let modal1=<Login changeModal={changeModal}/>
    let modal2=<Registration changeModal={changeModal}/>

    return <div className="login-modal-screen">
        <div className={`double-block ${move?'move':''}`}>
            <div className='screen'>
                {activemodal?modal2:modal1};
            </div>
            <div className='screen'>
                {activemodal?modal1:modal2};
            </div>
        </div>
    </div>
}
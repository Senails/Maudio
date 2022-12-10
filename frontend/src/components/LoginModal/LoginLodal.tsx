import { useEffect, useState } from 'react';
import './style.scss';

export function LoginModal(){
    let [show,setshow]=useState(false);
    let [move,setmove]=useState(false);

    // return <></>;

    useEffect(()=>{
        if (show){
            document.body.classList.add('block');
        }else{
            document.body.classList.remove('block');
        }
    },[show]);//onClick={()=>setshow(!show)} 

    return <div className="login-modal-screen">
        <div className={`double-block ${move?'move':''}`}>
            <div onClick={()=>setmove(!move)} className='screen'>
                <div className='login-modal'></div>
            </div>
            <div onClick={()=>setmove(!move)} className='screen'>
                <div className='login-modal'></div>
            </div>
        </div>
    </div>
}
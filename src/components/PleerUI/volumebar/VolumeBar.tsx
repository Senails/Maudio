import { useEffect, useRef } from 'react';
import { RootState, useAppSelector } from '../../../redux/store';
import './style.scss';

export default function Volumebar(){
    let {userSelectVolume} = useAppSelector((state:RootState)=>state.pleer);
    let circle = useRef<HTMLDivElement>(null);


    useEffect(()=>{





    },[]);

    
    return <div className={`volume-box ${userSelectVolume>0?'':'block'} changed`}>
        <div className='volume-icon'></div>
        <div className='volume-polzik'>
            <div className='volume-polzik-line'>
                <div className='volume-line'>
                    <div ref={circle} className='circle'></div>
                </div>
            </div>
        </div>
    </div>
}
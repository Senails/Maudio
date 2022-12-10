import { setplay, UserSelectLenght } from "../../../redux/slices/pleerSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

export function MiniPlayPause(){
    let lenght = useAppSelector(state=>state.pleer.lenght);
    let playpause = useAppSelector(state=>state.pleer.playpause);
    let dispatch = useAppDispatch();

    function onclickPlay(){
        if (playpause==='play'){
            dispatch(setplay('pause'))
        }else{
            dispatch(setplay('play'))
        }
    }

    async function onclickchange(type:'left'|'right'){
        let num = type==='left'?-15:15;
        dispatch(UserSelectLenght(lenght+num));
    }

    return <div className='pause-box'>
    <div onClick={()=>onclickchange('left')} className='left-arrow'>
        <div></div>
        <div></div>
        <span>15s</span>
    </div>
    <div className={`play-button ${playpause}`} onClick={onclickPlay}></div>
    <div onClick={()=>onclickchange('right')} className='right-arrow'>
        <div></div>
        <div></div>
        <span>15s</span>
    </div>
</div>
}
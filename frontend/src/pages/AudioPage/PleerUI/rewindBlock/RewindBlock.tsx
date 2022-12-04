import { UserSelectLenght } from '../../../../redux/slices/pleerSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import './style.scss';

export function RewindBlock(){
    let lenght = useAppSelector(state=>state.pleer.lenght);
    let dispatch = useAppDispatch();

    async function onclickchange(type:'left'|'right'){
        let num = type==='left'?-15:15;
        dispatch(UserSelectLenght(lenght+num));
    }

    return <div className='rewind-block'>
        <div onClick={()=>onclickchange('left')} className='left-arrow'>
            <div></div>
            <div></div>
            <span>15s</span>
        </div>
        <div onClick={()=>onclickchange('right')} className='right-arrow'>
            <div></div>
            <div></div>
            <span>15s</span>
        </div>
    </div>
}
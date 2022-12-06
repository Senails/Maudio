import { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { setplay, setshowmini } from '../../redux/slices/pleerSlice';
import { useAppDispatch } from '../../redux/store';
import './style.scss';

export function NoPage(){
    let dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(setplay('pause'));
        dispatch(setshowmini(false));
    })

    return <div className="nopage">
        <span className='nopage-massage'>
            <span>Произошла какая то ошибка{':('}</span>
            <span><Link to={'/'}>Перейти на главную страницу</Link></span>
        </span>
    </div>
}
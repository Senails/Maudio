import { showhidemodal } from '../../../redux/slices/userSlice';
import { useAppDispatch } from '../../../redux/store';
import './style.scss';

export function ExitModal(){
    let dispatch = useAppDispatch();
    function onclick(){
        dispatch(showhidemodal(false));
    }

    return <div onClick={onclick} className="exit-modal">
        <div></div>
        <div></div>
    </div>
}
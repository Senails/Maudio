import { useAppSelector } from "../../../redux/store";
import { numToTime } from "../../../Utils/forPleer/numtotime";

export function MiniProgressLine(){
    let lenght = useAppSelector(state=>state.pleer.lenght);
    let alllenght = useAppSelector(state=>state.pleer.bookMap.booklength);

    return <div className='progress-line'>
    <div className='progress-line-white' style={{width: `${lenght/alllenght*100}%`}}></div>
    <div className="show-time">{numToTime(lenght)}</div>
</div>
}
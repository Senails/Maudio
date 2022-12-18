import { CommentType } from '../../../../../redux/slices/BookInfoSlice';
import { DateToString } from '../../../../../Utils/other/DateToString';
import './style.scss';

export function CommentBlock({text,user,date}:CommentType){

    return <div className="comment-comp">
        <div className='headline'>
            <span>{user}</span>
            <span>{DateToString(date)}</span>
            <span>удалить</span>
        </div>
        <p className=''>
            {text}
        </p>
    </div>
}

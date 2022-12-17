import { comment } from '../../../../../redux/slices/BookInfoSlice';
import { DateToString } from '../../../../../Utils/other/DateToString';
import './style.scss';

export function CommentBlock({text,user,date,id}:comment){

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

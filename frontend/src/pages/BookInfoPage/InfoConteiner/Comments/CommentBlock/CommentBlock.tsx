import { FetchComment } from '../../../../../api/getbookdata';
import { DateToString } from '../../../../../Utils/other/DateToString';
import './style.scss';

export function CommentBlock({text,username,date}:FetchComment){

    return <div className="comment-comp">
        <div className='headline'>
            <span>{username}</span>
            <span>{DateToString(date)}</span>
            <span>удалить</span>
        </div>
        <p className=''>
            {text}
        </p>
    </div>
}

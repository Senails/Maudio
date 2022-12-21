import { FetchComment } from '../../../../../api/getbookdata';
import { userRemoveComment } from '../../../../../redux/slices/BookInfoSlice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/store';
import { DateToString } from '../../../../../Utils/other/DateToString';
import './style.scss';

export function CommentBlock(props:FetchComment){
    let {text,username,date} = props;
    let dispatch = useAppDispatch();

    let _id = useAppSelector((state)=>state.bookinfo._id);
    let nameUser = useAppSelector((state)=>state.user.userName);
    let status = useAppSelector((state)=>state.user.userstatus);

    function clickDelete(){
        dispatch(userRemoveComment({_id,comm:props}));
    }

    return <div className="comment-comp">
        <div className='headline'>
            <span>{username}</span>
            <span>{DateToString(date)}</span>
            {(nameUser===username || status==='admin' || status==='editor')?
                <span onClick={clickDelete}>удалить</span>
            :<></>}
        </div>
        <p className=''>
            {text}
        </p>
    </div>
}

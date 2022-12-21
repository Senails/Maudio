import { useState } from "react";
import { FetchComment } from "../../../../../api/getbookdata";
import { userAddComment } from "../../../../../redux/slices/BookInfoSlice";
import { showhidemodal } from "../../../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { showMessage } from "../../../../../Utils/other/showMessage/showMessahe";

export function CommentInput(){
    let isAuth = useAppSelector((state)=>state.user.isAuth);
    let userName = useAppSelector((state)=>state.user.userName);
    let _id = useAppSelector((state)=>state.bookinfo._id);
    let dispatch = useAppDispatch();

    let [comment,setcomment]=useState('');

    function onclickbutton(event:React.MouseEvent){
        if (!isAuth) return dispatch(showhidemodal(true));
        if (comment.length<10) return showMessage(event,'напишите хотябы 10 символов');

        let payload: FetchComment = {
            username:userName,
            date:Date.now(),
            text:comment,
        }
        setcomment('');//
        dispatch(userAddComment({_id,comm:payload}))
    }

    return <div className="input">
    <input type="text"
    placeholder="ваш комментарий" 
    value={comment} 
    onChange={(event)=>event.target.value.length>300?{}:setcomment(event.target.value)}/>
    <div className='button' onClick={onclickbutton}>
        оставить
    </div>
    <p>{comment.length}/300</p>
</div>
}
import { useState } from "react";
import { showhidemodal } from "../../../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";

export function CommentInput(){
    let isAuth = useAppSelector((state)=>state.user.isAuth);
    let dispatch = useAppDispatch();

    let [comment,setcomment]=useState('');

    function onclickbutton(event:React.MouseEvent){
        if (!isAuth) return dispatch(showhidemodal(true));

        console.log('добавить коммент');
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
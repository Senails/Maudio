import { useAppSelector } from "../../../../redux/store";
import { ArrayComments } from "./ArrayComments/ArrayComments";
import { CommentInput } from "./CommentInput/CommentInput";

export function Comments(){
    let count = useAppSelector((state)=>state.bookinfo.comments?state.bookinfo.comments.length:0);

    return <div className='comments'>
        <h2>Комментарии <span>{count}</span></h2>
        <CommentInput/>
        <ArrayComments/>
    </div>
}
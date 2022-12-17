import { ArrayComments } from "./ArrayComments/ArrayComments";
import { CommentInput } from "./CommentInput/CommentInput";

export function Comments(){
    return <div className='comments'>
        <h2>Комментарии </h2>
        <CommentInput/>
        <ArrayComments/>
    </div>
}
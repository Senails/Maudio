import { useAppSelector } from '../../../../../redux/store';
import { CommentBlock } from '../CommentBlock/CommentBlock';
import './style.scss';


export function ArrayComments(){
    let comments = useAppSelector((state)=>state.bookinfo.comments);


    let commsBloks = comments.map((comm,i)=>{
        return <CommentBlock
            user={comm.user}
            date={comm.date}
            text={comm.text}
            id={comm.id}

            key={i}
        />
    })

    return <div className="array-comments">
        {comments.length>0?<div className='space'></div>:<></>}
        {commsBloks}
    </div>
}
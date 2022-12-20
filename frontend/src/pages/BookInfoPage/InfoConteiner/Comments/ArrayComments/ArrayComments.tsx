import { useAppSelector } from '../../../../../redux/store';
import { CommentBlock } from '../CommentBlock/CommentBlock';
import './style.scss';


export function ArrayComments(){
    let comments = useAppSelector((state)=>state.bookinfo.comments);


    let commsBloks = comments && comments.map((comm,i)=>{
        return <CommentBlock
            username={comm.username}
            date={comm.date}
            text={comm.text}

            key={i}
        />
    })

    return <div className="array-comments">
        {(comments && comments.length>0)?<div className='space'></div>:<></>}
        {commsBloks?.reverse()}
    </div>
}
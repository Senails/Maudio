import { comment } from '../../../../../redux/slices/BookInfoSlice';
import { useAppSelector } from '../../../../../redux/store';
import { CommentBlock } from '../CommentBlock/CommentBlock';
import './style.scss';

let comms:comment[]=[
    {
        user:'Senails',
        date: Date.now(),
        text:'да мне пофиг на все ваши комментарии мне пофиг и вобще не пишите их я не для вас их делал мелкие засранцы',
        id:`${Date.now()}`,
    },
    {
        user:'Senails',
        date: Date.now(),
        text:'да мне пофиг на все ваши комментарии мне пофиг и вобще не пишите их я не для вас их делал мелкие засранцы',
        id:`${Date.now()}`,
    }
]


export function ArrayComments(){
    let comments = useAppSelector((state)=>state.bookinfo.comments);


    let commsBloks = comms.map((comm,i)=>{
        return <CommentBlock
            user={comm.user}
            date={comm.date}
            text={comm.text}
            id={comm.id}

            key={i}
        />
    })

    return <div className="array-comments">
        {comms.length>0?<div className='space'></div>:<></>}
        {commsBloks}
    </div>
}
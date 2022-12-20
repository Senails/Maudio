import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../redux/store"

export function Line3(){
    let authtor = useAppSelector((state)=>state.bookinfo.authtor);
    let bookcount = useAppSelector((state)=>state.bookinfo.bookcount);
    let status = useAppSelector((state)=>state.user.userstatus);
    let progress = useAppSelector((state)=>state.bookinfo.progress);

    let navigate = useNavigate();
    let {bookname}=useParams();

    return <div className='line3'>
        <span>{authtor}</span>
        <span className='bookcount'> {bookcount} 
            <div className="book-icon"></div>
        </span>
        {progress?<span className="progress">Прослушано {(progress*100).toFixed(1)}%</span>:<></>}
        {(status==='editor'||status==='admin')?
            <span className='ToEdit'
            onClick={()=>navigate(`/edit/${bookname}`)}>редактировать</span>
        :<></>}
    </div>
}
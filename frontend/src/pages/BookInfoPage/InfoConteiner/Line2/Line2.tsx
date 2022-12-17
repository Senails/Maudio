import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../../../../redux/store"

export function Line2(){
    let description = useAppSelector((state)=>state.bookinfo.description);
    let image = useAppSelector((state)=>state.bookinfo.image);
    let navigate = useNavigate();
    let {bookname}=useParams();

    return <div className='line2'>
        <div className='image' style={{backgroundImage:`url(${image})`}}>
            <div className="fon">
                <div onClick={()=>navigate(`/listen/${bookname}`)} className="play-button"></div>
            </div>
        </div>
        {description}
        <div className='endline'></div>
    </div>
}
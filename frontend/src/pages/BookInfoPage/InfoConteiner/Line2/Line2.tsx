import { Link, useParams } from "react-router-dom"
import { useAppSelector } from "../../../../redux/store"

export function Line2(){
    let description = useAppSelector((state)=>state.bookinfo.description);
    let image = useAppSelector((state)=>state.bookinfo.image);
    let {bookname}=useParams();

    return <div className='line2'>
        <div className='image' style={{backgroundImage:`url(${image})`}}>
            <div className="fon">
                <div className="play-button">
                    <Link to={`/listen/${bookname}`}></Link>
                </div>
            </div>
        </div>
        {description}
        <div className='endline'></div>
    </div>
}
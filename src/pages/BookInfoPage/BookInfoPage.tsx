import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBookData } from '../../api/getbookdata';
import { Loader } from '../../components/Loader/Loader';
import { RootState, useAppSelector } from '../../redux/store';
import './style.scss';

export type BookData = {
    name:string,
    authtor:string,
    description:string,
    bookscount:number,
    bookimage:string,
}
let initDataState:BookData={
    name:'',
    authtor:'',
    description:'',
    bookscount:0,
    bookimage:'',
}
export function BookInfoPage(){
    let {bookname}=useParams();
    let navigate = useNavigate();
    let status = useAppSelector((state:RootState)=>state.user.userstatus);

    let[bookdata,setbookdata] = useState<BookData>(initDataState);
    let[loadend,setloadend]= useState(false);

    useEffect(()=>{
        onload()
        async function onload(){
            try{
                let data = await getBookData(bookname!);
                if (data!=='error'){
                    setbookdata(data);
                    setloadend(true);
                }else{
                    navigate('/404page');
                }
            }catch{
                navigate('/404page')
            }
        }
    },[]);

    let styleImage = {
        backgroundImage: `url(${bookdata.bookimage})`,
    }
    return <div className="info-page">
        {loadend?
        <>
            <p className='audiobook-link'>
                <Link to='/'>AudioBooks</Link>
            </p>
            <div className='info-conteiner'>
                <div className='book-image' style={styleImage}>
                    <div className='shadow'>
                        <div className='play'>
                            <Link to={`/listen/${bookname}`}></Link>
                        </div>
                    </div>
                </div>
                <div className='book-info'>
                    <h1>{bookdata.name}</h1>
                    <p>{bookdata.description}</p>
                    <span>
                        <span className='authtor'>{bookdata.authtor}</span>
                        <span className='bookcount'>
                            {bookdata.bookscount}
                            <div className='book-icon'></div>
                        </span>
                        {status!=='user'?<span><Link to={`/edit/${bookname}`}>to edit</Link></span>:<></>}
                    </span>
                </div>
            </div>
        </>
        :<Loader/>}
    </div>
}
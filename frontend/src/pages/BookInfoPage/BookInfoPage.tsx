import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBookData } from '../../api/getbookdata';
import { Loader } from '../../components/Loader/Loader';
import { RootState, useAppSelector } from '../../redux/store';
import { InfoConteiner } from './InfoConteiner/InfoConteiner';
import './style.scss';

export type BookData = {
    name:string,
    authtor:string,
    description:string,
    bookscount:number,
    bookimage:string,
    href?:string,
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
    },[status]);

    return <div className="info-page">
        {loadend?
        <>
            <p className='audiobook-link'>
                <Link to='/'>Audiobooks</Link>
            </p>
            <InfoConteiner/>
        </>
        :<Loader/>}
    </div>
}
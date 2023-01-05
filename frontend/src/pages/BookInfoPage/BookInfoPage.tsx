import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBookData } from '../../api/getbookdata';
import { Loader } from '../../components/Loader/Loader';
import { setInfoState } from '../../redux/slices/BookInfoSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { InfoConteiner } from './InfoConteiner/InfoConteiner';
import './style.scss';


export default function BookInfoPage(){
    let {bookname}=useParams();
    let navigate = useNavigate();
    let dispatch = useAppDispatch();

    let token = useAppSelector((state:RootState)=>state.user.token);
    let[loadend,setloadend]= useState(false);

    useEffect(()=>{
        onload()
        async function onload(){
            try{
                let data = await getBookData(bookname!,token);
                if (data!=='error'){
                    dispatch(setInfoState(data))
                    setloadend(true);
                }else{
                    navigate('/404page');
                }
            }catch{
                navigate('/404page')
            }
        }
    },[token]);

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
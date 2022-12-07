import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelSeria } from '../../api/editColls/cancelSeria';
import { deleteSeria } from '../../api/editColls/deleteSeria';
import { getDataForEdit } from '../../api/editColls/getDataForEdit';
import { saveSeria } from '../../api/editColls/saveSeria';
import { Loader } from '../../components/Loader/Loader';
import { setEditState } from '../../redux/slices/EditSlice';
import { useAppDispatch } from '../../redux/store';
import { abortUpload } from '../../Utils/apiUtils/abortFileUpload';
import { ValidationEdit } from '../../Utils/EditPage/Validation';
import { sleep } from '../../Utils/other/sleep';
import { FragmentsEditor } from './FragmentsEditor/FragmentsEditor';
import { ImageInput } from './Imageinput/ImageInput';
import './style.scss';
import { TextInputs } from './TextInputs/textInputs';

export function EditPage(){
    console.log('EditPage')

    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let { bookname } = useParams()

    let [loadend,setloadend]=useState(false);
    let [error,seterror]=useState('');
    let [ended,setended]=useState(false);

    useEffect(()=>{
        onOpen();
        window.addEventListener('beforeunload',onunload);
        return()=>{
            window.removeEventListener('beforeunload',onunload);
            if (!ended){
                localStorage.setItem('2222222','222222');
            }
        }
    },[])

    async function onOpen() {
        let res = await getDataForEdit(bookname!);
        if (res!=='error'){
            dispatch(setEditState(res));
        }else{
            navigate('/nopage');
        }
        setloadend(true);
    }

    async function saveCollection(){
        let ValidationMessage = ValidationEdit();
        if (ValidationMessage!=='ok'){
            seterror(ValidationMessage);
        }else{
            setloadend(false);
            let res = await saveSeria();
            if (res==='ok'){
                setended(true);
                await sleep(0);
                dispatch(setEditState(null));
                setloadend(true);
                navigate('/');
            }else{
                setloadend(true);
                seterror('попробуете чуть позже');
            }
        }
    }
    async function cancelCollection(){
        setended(true);
        await sleep(0);
        navigate('/');
        localStorage.setItem('3333333','333333')
        // setloadend(false);
        // abortUpload();
        // await sleep(0);
        // let res = await cancelSeria();
        // if (res==='ok'){
        //     dispatch(setEditState(null));
        //     setloadend(true);
        //     navigate('/');
        // }else{
        //     setloadend(true);
        //     seterror('попробуете чуть позже');
        // }
    }
    async function removeCollection(){
        setloadend(false);
        abortUpload();
        await sleep(0);
        let res = await deleteSeria();
        if (res==='ok'){
            setended(true);
            await sleep(0);
            dispatch(setEditState(null));
            setloadend(true);
            navigate('/');
        }else{
            setloadend(true);
            seterror('попробуете чуть позже');
        }
    }
    function onunload(){
        localStorage.setItem('1111111','1111111')
        abortUpload();
        cancelSeria();
    }

    return <div className={`edit-page `+(ondrag?'ongrag':'')}>    
        {loadend?<>
            <div className='edit-conteiner'>
                <ImageInput/>
                <div className='right-collomn'>
                    <TextInputs/>
                    <div className='books-group'>
                        <div className='box-editor-fragments'>
                            <FragmentsEditor/>
                        </div>
                    </div>
                    <div className='buttons-group'>
                        <div onClick={saveCollection}>сохранить</div>
                        <div onClick={cancelCollection}>отменить</div>
                        <div onClick={removeCollection}>удалить</div>
                    </div>
                </div>
            </div>
            {error!==''?<>
                <div className='error-message' onClick={()=>seterror('')}>
                    <span>Ошибка</span>
                    <span>{error}</span>
                    <span>кликните что бы закрыть</span>
                </div>
            </>:<></>}
        </>:<Loader/>}
    </div>
}
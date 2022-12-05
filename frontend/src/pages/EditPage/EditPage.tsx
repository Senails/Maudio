import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelSeria } from '../../api/editColls/cancelSeria';
import { deleteSeria } from '../../api/editColls/deleteSeria';
import { getDataForEdit } from '../../api/editColls/getDataForEdit';
import { saveSeria } from '../../api/editColls/saveSeria';
import { Loader } from '../../components/Loader/Loader';
import { setauthtorname, setcollname, setdescription, asyncSetMainImage, setEditState } from '../../redux/slices/EditSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { abortUpload } from '../../Utils/apiUtils/abortFileUpload';
import { ValidationEdit } from '../../Utils/EditPage/Validation';
import { FragmentsEditor } from './FragmentsEditor/FragmentsEditor';
import './style.scss';


export function EditPage(){
    let {collName,authtorName,description,bookImage} = useAppSelector((state:RootState)=>state.edit);
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let { bookname } = useParams()

    let [loadend,setloadend]=useState(false);
    let [error,seterror]=useState('');

    useEffect(()=>{
        onOpen();

        return()=>{

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
    async function onchange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files===null) return;
        let file = event.target.files![0];
        dispatch(asyncSetMainImage(file));
        event.target.value='';
    }


    async function saveCollection(){
        let ValidationMessage = ValidationEdit();
        if (ValidationMessage!=='ok'){
            seterror(ValidationMessage);
        }else{
            setloadend(false);
            let res = await saveSeria();
            if (res==='ok'){
                setloadend(true);
                navigate('/');
            }else{
                setloadend(true);
                seterror('попробуете чуть позже');
            }
        }
    }
    async function cancelCollection(){
        abortUpload()

        // setloadend(false);
        // let res = await cancelSeria();
        // if (res==='ok'){
        //     setloadend(true);
        //     navigate('/');
        // }else{
        //     setloadend(true);
        //     seterror('попробуете чуть позже');
        // }
    }
    async function removeCollection(){
        setloadend(false);
        let res = await deleteSeria();
        if (res==='ok'){
            setloadend(true);
            navigate('/');
        }else{
            setloadend(true);
            seterror('попробуете чуть позже');
        }
    }

    function onForseCancel(){
        cancelSeria()
    }

    let activeimageStyle = {
        backgroundImage:`url(${bookImage.url})`,
    }

    return <div className={`edit-page `+(ondrag?'ongrag':'')}>    
        {loadend?<>
            <div className='edit-conteiner'>
                <div className={`book-image ${bookImage.status==='loadend'?"haveimage":''}`}>
                    <div className='activeimage' style={bookImage.status==='loadend'?activeimageStyle:{}}>
                        {bookImage.status==='loading'?<Loader/>:<></>}
                        {bookImage.status==='error'?<>
                        <span>Ошибка</span>
                        <span>загрузите сного</span>
                        </>:<></>}
                        {bookImage.status!=='loading'?<input type="file" accept="image/*" onInput={onchange}/>:<></>}
                    </div>
                </div>
                <div className='right-collomn'>
                    <input type="text" 
                        value={collName} 
                        onChange={(event)=>dispatch(setcollname(event.target.value))}  
                        className={`text serias-name`} 
                        placeholder='Введите название*'/>
                    <input type="text" 
                        value={authtorName} 
                        onChange={(event)=>dispatch(setauthtorname(event.target.value))}  
                        className={`text authtor-name`} 
                        placeholder='Имя Автора*'/>
                    <div className='textarea'>
                        <textarea 
                            value={description} 
                            onChange={(event)=>dispatch(setdescription(event.target.value))} 
                            placeholder='Введите описание*'>
                        </textarea>
                        <span>{`${description.length}/1000`}</span>
                    </div>
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
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { cancelSeria } from '../../api/editColls/cancelSeria';
import { deleteSeria } from '../../api/editColls/deleteSeria';
import { getDataForEdit } from '../../api/editColls/getDataForEdit';
import { saveSeria } from '../../api/editColls/saveSeria';
import { Loader } from '../../components/Loader/Loader';
import { setauthtorname, setcollname, setdescription, asyncSetMainImage, setEditState } from '../../redux/slices/EditSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { ValidationEdit } from '../../Utils/EditPage/Validation';
import { FragmentsEditor } from './FragmentsEditor/FragmentsEditor';
import './style.scss';

let val = {collName:true,authtorName:true,description:true};

export function EditPage(){
    let {collName,authtorName,description,bookImage} = useAppSelector((state:RootState)=>state.edit);
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let { bookname } = useParams()

    let [validsate,setvalidsate]=useState<{[key:string]:boolean}>(val);
    let [loadend,setloadend]=useState(false);
    let [error,seterror]=useState('');

    useEffect(()=>{
        onOpen();
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
        let checked = ValidationEdit({collName,authtorName,description});
        if (checked!=='ok'){
            setvalidsate(checked);
            seterror('заполните текстовые поля. (RU)');
        }else{
            setvalidsate(val);
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
        setloadend(false);
        let res = await cancelSeria();
        if (res==='ok'){
            setloadend(true);
            navigate('/');
        }else{
            setloadend(true);
            seterror('попробуете чуть позже');
        }
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
                        className={`${validsate['collName']?'':'borderRed'} text serias-name`} 
                        placeholder='Collection name*'/>
                    <input type="text" 
                        value={authtorName} 
                        onChange={(event)=>dispatch(setauthtorname(event.target.value))}  
                        className={`${validsate['authtorName']?'':'borderRed'} text authtor-name`} 
                        placeholder='Authtor name*'/>
                    <textarea 
                        value={description} 
                        onChange={(event)=>dispatch(setdescription(event.target.value))} 
                        className={`${validsate['description']?'':'borderRed'}`}  placeholder='Collection description*'></textarea>
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
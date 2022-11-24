import { useEffect, useState } from 'react';
import { Loader } from '../../components/Loader/Loader';
import { setauthtorname, setcollname, setdescription, asyncSetMainImage } from '../../redux/slices/EditSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { FragmentsEditor } from './FragmentsEditor/FragmentsEditor';
import './style.scss';

export function EditPage(){
    let {collName,authtorName,description,bookImage} = useAppSelector((state:RootState)=>state.edit);
    let dispatch = useAppDispatch();

    async function onchange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files===null) return;
        let file = event.target.files![0];
        dispatch(asyncSetMainImage(file));
        event.target.value='';
    }

    let activeimageStyle = {
        backgroundImage:`url(${bookImage.url})`,
    }

    return <div className={`edit-page `+(ondrag?'ongrag':'')}>    
        <div className='edit-conteiner'>
            <div className={`book-image ${bookImage.status==='loadend'?"haveimage":''}`}>
                <div className='activeimage' style={bookImage.status==='loadend'?activeimageStyle:{}}>
                    {bookImage.status==='loading'?<Loader/>:<></>}
                    {bookImage.status==='error'?<>
                    <span>Ошибка</span>
                    <span>загрузите сного</span>
                    </>:<></>}
                    {bookImage.status!=='loading'?<input type="file" onInput={onchange}/>:<></>}
                </div>
            </div>
            <div className='right-collomn'>
                <input type="text" value={collName} onChange={(event)=>dispatch(setcollname(event.target.value))}  className=' text serias-name' placeholder='Collection name*'/>
                <input type="text" value={authtorName} onChange={(event)=>dispatch(setauthtorname(event.target.value))}  className=' text authtor-name' placeholder='Authtor name*'/>
                <textarea value={description} onChange={(event)=>dispatch(setdescription(event.target.value))}  placeholder='Collection description*'></textarea>
                <div className='books-group'>
                    <div className='box-editor-fragments'>
                        <FragmentsEditor/>
                    </div>
                </div>
                <div className='buttons-group'>
                    <div>сохранить</div>
                    <div>отменить</div>
                    <div>удалить</div>
                </div>
            </div>
        </div>
    </div>
}
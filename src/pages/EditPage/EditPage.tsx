import { useEffect, useState } from 'react';
import { setauthtorname, setSeriasImage, setcollname, setdescription } from '../../redux/slices/EditSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { getSrcFromFile } from '../../Utils/other/getSrc';
import { FragmentsEditor } from './FragmentsEditor/FragmentsEditor';
import './style.scss';

export function EditPage(){
    let {collName,authtorName,description,bookImage} = useAppSelector((state:RootState)=>state.edit);
    let dispatch = useAppDispatch();

    async function onchange(event: React.ChangeEvent<HTMLInputElement>){
        let file = event.target.files![0];
        let src =await getSrcFromFile(file);
        dispatch(setSeriasImage(src));
        event.target.value='';
    }

    let activeimageStyle = {
        backgroundImage:`url(${bookImage})`,
    }

    return <div className={`edit-page `+(ondrag?'ongrag':'')}>    
        <div className='edit-conteiner'>
            <div className='book-image'>
                <div className='activeimage' style={activeimageStyle}>
                    <input type="file" onInput={onchange}/>
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
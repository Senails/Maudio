import { useEffect, useState } from 'react';
import { getSrcFromFile } from '../../Utils/other/getSrc';
import { FragmentsEditor } from './FragmentsEditor/FragmentsEditor';
import './style.scss';

export function EditPage(){
    let [seriasImage, setseriasImage]= useState('http://localhost:3000/static/media/img1.a13b7f9a6e77a8409bdb.jpg');
    let [ondrag,setondrag]= useState(false);

    async function onchange(event: React.ChangeEvent<HTMLInputElement>){
        let file = event.target.files![0];
        let src =await getSrcFromFile(file);
        setseriasImage(src);
        setondrag(false);
    }

    function onMouseover(event:React.MouseEvent){
        // console.log(event);
        // console.log();
    }

    let activeimageStyle = {
        backgroundImage:`url(${seriasImage})`,
    }
    return <div className={`edit-page `+(ondrag?'ongrag':'')} onMouseOver={onMouseover}>    
        <div className='edit-conteiner'>
            <div className='book-image'>
                <div className='activeimage' style={activeimageStyle}>
                    <input type="file" onInput={onchange}/>
                </div>
            </div>
            <div className='right-collomn'>
                <input type="text" className=' text serias-name' placeholder='Collection name*'/>
                <input type="text" className=' text authtor-name' placeholder='Authtor name*'/>
                <textarea placeholder='Collection description*'></textarea>
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
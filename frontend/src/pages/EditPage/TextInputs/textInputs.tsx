import { setauthtorname, setcollname, setdescription } from "../../../redux/slices/EditSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../redux/store";

export function TextInputs(){
    let dispatch = useAppDispatch();

    let collName = useAppSelector((state:RootState)=>state.edit.collName);
    let authtorName = useAppSelector((state:RootState)=>state.edit.authtorName);
    let description = useAppSelector((state:RootState)=>state.edit.description);
    
    return <>
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
    </>
}
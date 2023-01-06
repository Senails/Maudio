import { useRef } from 'react';
import './style.scss';

type propsType = {
    type:'text'|'password',
    placeholder:string,
    name:string,
    value:string,
    onChange:(value:string)=>void,
}

export function Input({type,placeholder,name,value,onChange}:propsType){
    let inputElem = useRef<HTMLInputElement>(null);

    function onchange(event:React.ChangeEvent<HTMLInputElement>){
        onChange(event.target.value);
    }

    function onclick(){
        inputElem.current?.focus();
    }

    return <div className="My-Input">
        <input ref={inputElem} name={name} type={type} value={value} onChange={(event)=>onchange(event)}/>
        <span onClick={onclick} className={`placeholder ${value===''?'':'active'}`}>{placeholder}</span>
        <span className={`input-fon ${value===''?'':'active'}`}>{placeholder}</span>
        {/* <label htmlFor="input"></label> */}
    </div>
}
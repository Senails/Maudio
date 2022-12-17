import React, { useState } from 'react';
import { useAppSelector } from '../../../../redux/store';
import { showMessage } from '../../../../Utils/other/showMessage/showMessahe';
import { sleep } from '../../../../Utils/other/sleep';
import './style.scss';


type propsType = {
    activevar:string,
    arrVariant:string[],
    onChange:(selectVar:string)=>void,
    type:'sorting'|'filter',
}

export function MySelect({arrVariant,onChange,type,activevar}:propsType){
    let [open,setopen] = useState(false);
    let isAuth = useAppSelector((state)=>state.user.isAuth)
    let block = (!isAuth && type==='filter');

    let varList = arrVariant.map((variant,i)=>{
        let active = (variant===activevar);

        function onclick(){
            if (open) {
                onChange(variant);
            }
        }
        return <div onClick={onclick} className={`variant-line ${active?'active':''}`} key={i}>
            {variant}
        </div>
    });

    function clickOnSelect(event:React.MouseEvent){
        if (!block){ 
            setopen(!open);
        }else{
            showMessage(event,'авторизуйтесь');
        }
    }

    return <div 
        onClick={clickOnSelect}
        onMouseLeave={()=>setopen(false)}
        className={`filter-component ${open?'open':''} ${block?'block':''}`}
        style={{height:`${arrVariant.length*31}px`}}>

        <div className={`${type}-icon`}></div>
        {varList}
    </div>
}

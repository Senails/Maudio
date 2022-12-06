import { useState } from 'react';
import { useAppSelector } from '../../../../redux/store';
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

    return <div 
        onClick={()=>!block?setopen(!open):{}}
        onMouseLeave={()=>setopen(false)}
        className={`filter-component ${open?'open':''} ${block?'block':''}`}
        style={{height:`${arrVariant.length*31}px`}}>

        <div className={`${type}-icon`}></div>
        {varList}
        <div className='help-text'>авторизуйтесь</div>
    </div>
}
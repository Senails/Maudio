import { useEffect, useState } from "react";
import { ButtonRender } from "../../../Utils/google/googleUtils";
import './style.scss';

export function GoogleButton(){
    let [error,seterror] = useState('');

    useEffect(()=>{
        let element = document.getElementById("google-login-button")!;
        ButtonRender(element);
        let iframe = element.querySelector('iframe');
        if (iframe) {
            seterror('');
        }else{
            seterror('error');
        }
    },[])
    return <div id="google-login-button" className={error}>
    </div>
}
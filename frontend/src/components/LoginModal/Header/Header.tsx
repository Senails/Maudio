import './style.scss';

type propsType = {
    text:string;
    error:string;
}

export function LoginHeader({text,error}:propsType){
    return <p className="auth-header">
    <span>{text}</span>
    {error!==''?<span>{error}</span>:<></>}
</p>
}
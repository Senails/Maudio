import { googleAuth } from "../../api/auth/googleAuth";
import { loginUser, setErrorMessage, setLoading, showhidemodal } from "../../redux/slices/userSlice";
import { dispatch } from "../../redux/store";
import { setLenghtOnLogin } from "../apiUtils/setLenghOnLogin";
import { sleep } from "../other/sleep";

export async function GoogleInit(){
    async function HandelCallbackResponse(response: google.accounts.id.CredentialResponse){
        dispatch(setLoading(true));
        let res = await googleAuth(response.credential);
        if (res==='error'){
            dispatch(setErrorMessage('авторизация через гугл не удалась, попробуйте позже'));
        }else{
            dispatch(loginUser(res));
            dispatch(showhidemodal(false));
            dispatch(setErrorMessage(''));
            setLenghtOnLogin();
            await sleep(300);
        }
        dispatch(setLoading(false));
    }
    
    window.google.accounts.id.initialize({
    client_id:'1057357561839-36cl94vijd5ip1fsc9e7918m2b93ombj.apps.googleusercontent.com',
    callback: HandelCallbackResponse
    })
}

export function ButtonRender(element: HTMLElement){
    google.accounts.id.renderButton(
        element,
        {theme: "outline", size: "large", type:'standard'}  // customization attributes
    );
}
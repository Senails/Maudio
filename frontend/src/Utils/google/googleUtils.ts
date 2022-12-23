import { googleAuth } from "../../api/auth/googleAuth";

export async function GoogleInit(){
    function HandelCallbackResponse(response: google.accounts.id.CredentialResponse){
        googleAuth(response.credential);
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
import { store } from "../../redux/store";

export async function SetLikeOnBackend(href:string){
    let token = store.getState().user.token;

    // написать код лайка для href
}
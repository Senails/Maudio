import { store } from "../../redux/store";
let editState = store.getState().edit;

export async function deleteSeria():Promise<'error'|'ok'>{
    let hrefName = editState.href;
    let removeList = editState.removeOnCancel;


    return 'ok';
}
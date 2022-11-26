import { store } from "../../redux/store";
let editState = store.getState().edit;

export async function cancelSeria():Promise<'error'|'ok'>{
    
    return 'ok';
}
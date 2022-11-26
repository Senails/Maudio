import { store } from "../../redux/store";
import { sleep } from "../../Utils/other/sleep";
let editState = store.getState().edit;

export async function saveSeria():Promise<'error'|'ok'>{
    await sleep(300);
    return 'ok';
}
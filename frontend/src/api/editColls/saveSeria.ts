import { store } from "../../redux/store";
import { BookMapFetch} from "../../types/api";
import { EditState } from "../../types/editSlice";
import { editMapToApiMap } from "../../Utils/apiUtils/apiUtils";
import { GetToken } from "../../Utils/appData/GetSaveToken";
import { adress } from "../apiAdress";


export async function saveSeria():Promise<'error'|'ok'>{
    try{
        let editState: EditState = store.getState().edit;
        let fetchBookMap: BookMapFetch = editMapToApiMap(editState);
        let removeList = editState.removeOnSave;

        let apiObj = {
            bookMap:fetchBookMap,
            RemoveList:removeList,
            lasthref: editState.href,
        }

        let apiadress=adress+`/api/${editState.href==='newbook'?'save':'edit'}`;
        let res = await fetch(apiadress,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'authorization': GetToken(),
            },
            body:JSON.stringify(apiObj),
        })
        let text= await res.text();

        return text as 'error'|'ok';
    }catch (e){
        return 'error';
    }
}

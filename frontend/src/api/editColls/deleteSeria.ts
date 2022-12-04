import { store } from "../../redux/store";
import { EditState } from "../../types/editSlice";
import { allFilesToRemoveList } from "../../Utils/apiUtils/apiUtils";
import { GetToken } from "../../Utils/other/GetSaveToken";
import { adress } from "../apiAdress";

export async function deleteSeria():Promise<'error'|'ok'>{
    try{
        let editState: EditState = store.getState().edit;
        let removeList1:string[] = editState.removeOnCancel;
        let removeList2:string[] = allFilesToRemoveList(editState);

        let apiObj = {
            RemoveList:[...removeList1,...removeList2],
            href:editState.href,
        }

        let apiadress=adress+`/api/delete`;
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
    }catch{
        return 'error';
    }
}

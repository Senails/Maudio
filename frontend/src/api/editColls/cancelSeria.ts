import { store } from "../../redux/store";
import { EditState } from "../../types/editSlice";
import { GetToken } from "../../Utils/other/GetSaveToken";
import { adress } from "../apiAdress";

export async function cancelSeria():Promise<'error'|'ok'>{
    try{
        let editState: EditState = store.getState().edit;
        let removeList = editState.removeOnCancel;

        let apiObj = {
            RemoveList:removeList,
        }

        let apiadress=adress+`/api/cancel`;
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
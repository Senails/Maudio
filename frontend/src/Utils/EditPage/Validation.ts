import { store } from "../../redux/store";

export function ValidationEdit():string{
    let editState = store.getState().edit;
    if (editState.loading) return 'фрагменты еще загружаются';
    if (editState.authtorName==='') return 'заполните имя автора';
    if (editState.collName==='') return 'введите название';
    if (editState.description==='') return 'заполните описание';



    return 'ok';
}
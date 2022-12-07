import { store } from "../../redux/store";

export function ValidationEdit():string{
    let editState = store.getState().edit;
    if (editState.loading) return 'фрагменты еще загружаются';
    if (editState.authtorName==='') return 'заполните имя автора';
    if (editState.collName==='') return 'введите название';
    if (editState.description==='') return 'заполните описание';
    if (editState.authtorName.length>40) return 'имя автора максимум 40 символов';
    if (editState.collName.length>40) return 'название максимум 40 символов';
    if (editState.description.length>1000) return 'описание максимум 1000 символов';
    if (checkRegular(editState.authtorName)) return 'используйте русские символы';
    if (checkRegular(editState.collName)) return 'используйте русские символы';
    return 'ok';
}

function checkRegular(str:string){
    let regular = /^[0-9а-яА-Я ;:,.?!-]+$/;
    return !regular.test(str)
}
import { getBookMap } from "../../api/getbookmap";
import { changebook, setAllState, setshowmini, UserSelectLenght } from "../../redux/slices/pleerSlice";
import { dispatch, store } from "../../redux/store";
import { setUserProgress } from "../apiUtils/saveUserProgress";

let progresskey = '3sadh1dgsg6fgd';

type memType = {
  href: string;
  activeColl: number;
  activeBook: number;
  activeLenght: number;
  alllenght:number;
}

export async function SetUnloadSaveProgress() {
  window.addEventListener('beforeunload',beforeunload);
  function beforeunload(){
    saveProgressLastBook();
  }
  return 'end';
}

export function saveProgressLastBook() {
  let pleerState = store.getState().pleer;
  if (pleerState.hrefparam==='')return;

  let memoBook:memType = {
    href:pleerState.hrefparam,
    activeColl:pleerState.activecollection,
    activeBook:pleerState.activebook,
    activeLenght:pleerState.lenght,
    alllenght: pleerState.seria.collections
    .reduce<number>((accumulator,coll)=>accumulator+coll.lenght,0),
  }
  let json = JSON.stringify(memoBook);
  localStorage.setItem(progresskey,json);
}

export async function getProgress() {
  let json = localStorage.getItem(progresskey);
  if (!json) return;

  let memoBook:memType = JSON.parse(json);
  let {href,activeColl,activeBook,activeLenght,alllenght} = memoBook;

  let data = await getBookMap(href!);
  if (data==='error')return;

  if (data.progress){
    dispatch(setAllState({seria:data, hrefparam: href}));
    setUserProgress(data.progress);
    return;
  }

  let seriaLenght = data.collections.reduce<number>((accumulator,coll)=>accumulator+coll.lenght,0);
  if (alllenght>seriaLenght) return;
  if (activeColl>data.collections.length) return;
  if (activeBook>data.collections[activeColl].books.length) return;
  if (activeLenght>data.collections[activeColl].books[activeBook].booklength) return;

  dispatch(setAllState({seria:data, hrefparam: href}));
  dispatch(changebook({coll:activeColl,book:activeBook}));
  dispatch(UserSelectLenght(activeLenght));
  dispatch(setshowmini(true));
  return 'end';
}
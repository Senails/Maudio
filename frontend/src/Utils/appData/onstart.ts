import { GoogleInit } from "../google/googleUtils";
import { getProgress, SetUnloadSaveProgress } from "./getSaveProgress";
import { tryauth } from "./GetSaveToken";

export async function onOpen(){
    let arr = [
      tryauth(),
      SetUnloadSaveProgress(),
      getProgress(),
      GoogleInit(),
    ];
    await Promise.all(arr);
    return 'start';
}
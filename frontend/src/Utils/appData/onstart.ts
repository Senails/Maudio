import { getProgress, SetUnloadSaveProgress } from "./getSaveProgress";
import { tryauth } from "./GetSaveToken";

export async function onOpen(){
    let arr = [
      tryauth(),
      SetUnloadSaveProgress(),
      getProgress(),
    ];
    await Promise.all(arr);
    return 'start';
}
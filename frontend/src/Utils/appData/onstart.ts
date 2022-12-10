import { getProgress, saveProgress } from "./getSaveProgress";
import { tryauth } from "./GetSaveToken";

export async function onOpen(){
    let arr = [
      tryauth(),
      saveProgress(),
      getProgress(),
    ];
    await Promise.all(arr);
    return 'start';
}
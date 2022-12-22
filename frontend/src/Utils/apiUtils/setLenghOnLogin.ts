import { getBookMap } from "../../api/getbookmap";
import { store } from "../../redux/store";
import { setUserProgress } from "./saveUserProgress";

export async function setLenghtOnLogin() {
    let state = store.getState();
    let hrefBookNow = state.pleer.hrefparam;
    let bookMap = await getBookMap(hrefBookNow);

    if (bookMap!=='error' && bookMap.progress){
        setUserProgress(bookMap.progress);
    }
}
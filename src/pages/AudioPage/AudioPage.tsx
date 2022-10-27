import { Book } from "./book/Book";
import LeftPanel from "./leftPanel/LeftPanel";
import { PleerUI } from "./PleerUI/Pleer";

export default function AudioPage(){
    return <div className=".AudioPage">
        <Book/>
        <PleerUI/>
        <LeftPanel/>
    </div>
}
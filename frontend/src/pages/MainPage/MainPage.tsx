import { BookCardBox } from './BookCardBox.tsx/BookCardBox';
import { MainTopLine } from './MainTopLine/MainTopLine';
import './style.scss';


export default function MainPage(){
    return <div className="MainPage">
        <MainTopLine/>
        <BookCardBox/>
    </div>
}
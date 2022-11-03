import './style.scss';

export default function MainPage(){
    return <div className="MainPage">
        <div className='main-input'>
            <input type="text" placeholder='введите название книги или автора'/>
            <div className='input-icon'></div>
        </div>
        <div className='bookcard-box'></div>
    </div>
}
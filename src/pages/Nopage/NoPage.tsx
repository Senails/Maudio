import { Link} from 'react-router-dom';
import './style.scss';

export function NoPage(){

    return <div className="nopage">
        <span className='nopage-massage'>
            <span>Этой страницы не существует {':('}</span>
            <span><Link to={'/'}>Перейти на главную страницу</Link></span>
        </span>
    </div>
}
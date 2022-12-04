import { Link} from 'react-router-dom';
import './style.scss';

export function NoPage(){
    return <div className="nopage">
        <span className='nopage-massage'>
            <span>Произошла какая то ошибка{':('}</span>
            <span><Link to={'/'}>Перейти на главную страницу</Link></span>
        </span>
    </div>
}
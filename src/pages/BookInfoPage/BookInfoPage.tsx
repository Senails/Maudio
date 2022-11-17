import { Link } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader';
import './style.scss';

export function BookInfoPage(){

    let loadend = false

    let styleImage = {
        backgroundImage: `url(${'http://localhost:3000/static/media/img1.a13b7f9a6e77a8409bdb.jpg'})`,
    }

    return <div className="info-page">
        {loadend?
        <>
            <p className='audiobook-link'>
                <Link to='/'>AudioBooks</Link>
            </p>
            
            <div className='info-conteiner'>
                <div className='book-image' style={styleImage}>
                    <div className='shadow'>
                        <div className='play'>
                            <Link to={'/listen/123'}></Link>
                        </div>
                    </div>
                </div>

                <div className='book-info'>
                    <h1>Сэр Макс из Ехо</h1>
                    <p>В нашем, земном мире Макс был неудачником, находившим отдых только в красочных снах. И однажды от человека из сна он получил предложение, от которого невозможно отказаться. Он навеки оставил Землю и перенёсся в волшебный мир Ехо. Здесь он — правая рука великого и ужасного сэра Джуффина Халли, главы тайного сыска, борющегося с незаконным применением магии. Его считают загадочным варваром, гениальным сыщиком и опаснейшим человеком…</p>
                    <span>
                        <span className='authtor'>Макс Фрай</span>
                        <span className='bookcount'>
                            12
                            <div className='book-icon'></div>
                        </span>
                        <span><Link to={'/'}>to edit</Link></span>
                    </span>
                </div>
            </div>
        </>
        :<Loader/>}
    </div>
}
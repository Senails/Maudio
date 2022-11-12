import './style.scss';
import {Link} from 'react-router-dom';
 
type props = {
    href:string;
    img:string;
    bookcount:number;
    authtor:string;
    name:string;
}


export function BookCard({img,bookcount,authtor,name,href}:props){
    const divStyle = {
        backgroundImage: `url(${img}')`,
    };

    return <div className='book-card'>
        <div className='book-image' style={divStyle}></div>
        <p className='serias-name'>{name}</p>
        <p className='authtor-name'>{authtor}</p>
        <span className='book-count'>
            {bookcount} 
            <div className='book-icon'></div>
        </span>
        <Link to={href}></Link>
    </div>
}
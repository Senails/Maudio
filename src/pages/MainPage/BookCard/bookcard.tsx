import './style.scss';

 
type props = {
    img:string;
    bookcount:number;
    authtor:string;
    name:string;
}


export function BookCard({img,bookcount,authtor,name}:props){
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
    </div>
}
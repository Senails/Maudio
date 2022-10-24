import './style.scss';


type Props = {
    name:string;
}

export default function BookPanel({name}:Props) {


    return <div className='book-panel-box'>
        <p>{name}</p>
        <div className='line-box'></div>
    </div>
}
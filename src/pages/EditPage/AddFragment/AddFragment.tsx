import './style.scss';

type props = {
    onClick:()=>void,
}

export function AddFragment({onClick}:props){
    return <div className="addfragment" onClick={onClick}>
        <div></div>
        <div></div>
    </div>
}
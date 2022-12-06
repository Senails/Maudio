type props = {
    like:boolean;
    onClick:(event:React.MouseEvent)=>void;
}

export function LikeHeart({like,onClick}:props){
    return <div onClick={onClick} className={`likebook-icon ${like?'active':''}`}></div>
}
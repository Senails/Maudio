type props = {
    reit?:number;
}

export function StarIcon({reit}:props){
    return <span className='cense'>
        {reit?reit:'?'}
        <div className='start-icon'></div>
    </span>
}
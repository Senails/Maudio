type props = {
    reit?:number;
}

export function StarIcon({reit}:props){
    return <span className='cense'>
        {reit?reit.toFixed(1):'?'}
        <div className='start-icon'></div>
    </span>
}
type props = {
    progress:number
}

export function ProgressLine({progress}:props){
    let num = progress.toFixed();
    return <div className='propress-line'>
        <span>{num}%</span>
        <div className='light-line' style={{width:`${num}%`}}></div>
    </div>
}
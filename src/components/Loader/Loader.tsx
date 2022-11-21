import './style.scss';

type propstype = {
    shadow?:true;
}

export function Loader({shadow}:propstype){

    return <div className={`loader ${shadow?'shadow':''}`}>
        <div className='spiner'>
            <div className='loaderpart'>
                <div className='loaderpart'>
                    <div className='loaderpart'></div>
                </div>
            </div>
        </div>
    </div>
}
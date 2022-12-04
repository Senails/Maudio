import './style.scss';

export function MiniLoader(){
    return <div className='mini-loader'>
        <div className='spiner'>
            <div className='loaderpart'>
                <div className='loaderpart'>
                    <div className='loaderpart'></div>
                </div>
            </div>
        </div>
    </div>
}
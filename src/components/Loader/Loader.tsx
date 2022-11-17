import './style.scss';

export function Loader(){
    return <div className="loader">
        <div className='spiner'>
            <div className='loaderpart'>
                <div className='loaderpart'>
                    <div className='loaderpart'></div>
                </div>
            </div>
        </div>
    </div>
}
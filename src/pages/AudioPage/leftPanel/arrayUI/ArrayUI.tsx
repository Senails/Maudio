import { RootState, useAppSelector } from '../../../../redux/store';
import Collection from '../Collection/collectin';
import './style.scss';

export default function ArrayUI(){
    let {seria ,activecollection, activebook}=useAppSelector((state:RootState)=>state.pleer);

    let collectionarr = seria.collections.map((elem,i)=>{
        return <Collection 
        name={elem.name}
        books={elem.books}
        activeColl={activecollection}
        activeBook={activebook}
        numColl={i}
        key={i}/>
    });

    return <div className="array-box">
        {collectionarr}
    </div>
}
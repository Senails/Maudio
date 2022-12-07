import { RootState, useAppSelector } from '../../../../redux/store';
import Collection from '../Collection/collectin';
import './style.scss';

export default function ArrayUI(){
    let collections = useAppSelector((state:RootState)=>state.pleer.seria.collections);

    let collectionarr = collections.map((elem,i)=>{
        return <Collection 
        name={elem.name}
        books={elem.books}
        numColl={i}
        collLenght={elem.lenght}
        key={i}/>
    });

    return <div className="array-box">
        {collectionarr}
    </div>
}
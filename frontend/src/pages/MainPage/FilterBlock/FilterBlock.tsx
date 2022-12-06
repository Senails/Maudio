import { setFilter, setSorting } from '../../../redux/slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { MySelect } from './MySelect/MySelect';
import './style.scss';

let variantsFilter:string[]=['все','любимые','уже слушал'];
let variantsSorting:string[]=['без сортировки','по популярности','по рейтингу']

export function FilterBlock(){
    let activesort = useAppSelector((state)=>state.search.sortingParam);
    let activefilter = useAppSelector((state)=>state.search.filterParam);

    let dispatch = useAppDispatch();

    function filterChange(selectvar:string){
        dispatch(setFilter(selectvar))
    }
    function sortingChange(selectvar:string){
        dispatch(setSorting(selectvar))
    }

    return <div className="filter-block">
        <div className='sorting-select'>
            <MySelect activevar={activesort} type='sorting' arrVariant={variantsSorting} onChange={sortingChange}/>
        </div>
        <div className='filter-select'>
            <MySelect activevar={activefilter} type='filter' arrVariant={variantsFilter} onChange={filterChange}/>
        </div>
    </div>
}
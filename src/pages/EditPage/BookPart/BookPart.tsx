import { MiniLoader } from '../../../components/MiniLoader/MiniLoader';
import { removeFragment } from '../../../redux/slices/EditSlice';
import { useAppDispatch } from '../../../redux/store';
import { Editbookpart } from '../../../types/editSlice';
import { numToTime } from '../../../Utils/forPleer/numtotime';
import { numToSize } from '../../../Utils/other/numToSize';
import './style.scss';

type PropsType = {
    part:Editbookpart,
    numCol:number,
    numBook:number,
    numFragment:number,
}

export function BookPart({part,numCol,numBook,numFragment}:PropsType){
    let dispatch = useAppDispatch();

    let {status, size, lenght}= part;
    let jsxfragment=<></>;

    if (status==='loading'){
        jsxfragment=<>
            <div className='loader-for-part'>
                <MiniLoader/>
            </div>
        </>
    }

    if (status==='loadend'){
        jsxfragment=<>
            <div className='fragment-data-block'>
                <span>{numToTime(lenght)}</span>
                <span>{numToSize(size||0)}</span>
            </div>
        </>
    }

    if (status==='error'){
        jsxfragment=<>
            <span className='error'>Ошибка загрузки</span>
        </>
    }

    return <div className='book-part-block'>
        {jsxfragment}
        <div className='delete' onClick={()=>{dispatch(removeFragment({numCol,numBook,numFragment}))}}>
            <div className='try'></div>
            <div className='try'></div>
        </div>
    </div>
}
import { MiniLoader } from '../../../components/MiniLoader/MiniLoader';
import { removeFragment } from '../../../redux/slices/EditSlice';
import { useAppDispatch } from '../../../redux/store';
import { Editbookpart } from '../../../types/editSlice';
import { abortUpload } from '../../../Utils/apiUtils/abortFileUpload';
import { numToTime } from '../../../Utils/forPleer/numtotime';
import { numToSize } from '../../../Utils/other/numToSize';
import './style.scss';

type PropsType = {
    part:Editbookpart,
    numCol:number,
    numBook:number,
}

export function BookPart({part,numCol,numBook}:PropsType){
    let dispatch = useAppDispatch();

    let {status, size, lenght,name}= part;
    let jsxfragment=<></>;

    if (status==='waitloading'){
        jsxfragment=<>
            <div className='fragment-data-block'>
                <span></span>
                <span>{`${name} ждет загрузки`}</span>
                <span></span>
            </div>
            <div className='delete' onClick={()=>{dispatch(removeFragment({numCol,numBook,partID:part.id}))}}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
        </>
    }

    if (status==='loading'){
        jsxfragment=<>
            <div className='fragment-data-block loading'>
                <div className='loader-for-part'>
                    <MiniLoader/>
                </div>
                <span>Идет загрузка...</span>
            </div>
            <div className='abort-button' onClick={()=>abortUpload()}>прервать</div>
        </>
    }

    if (status==='loadend'){
        jsxfragment=<>
            <div className='fragment-data-block'>
                <span>{numToTime(lenght)}</span>
                <span>{name}</span>
                <span>{numToSize(size||0)}</span>
            </div>
            <div className='delete' onClick={()=>{dispatch(removeFragment({numCol,numBook,partID:part.id}))}}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
        </>
    }

    if (status==='error'){
        jsxfragment=<>
            <div className='fragment-data-block'>
                <span className='error'>ошибка с {part.name}</span>
            </div>
            <div className='delete' onClick={()=>{dispatch(removeFragment({numCol,numBook,partID:part.id}))}}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
        </>
    }

    return <div className='book-part-block'>
        {jsxfragment}
    </div>
}
import { MiniLoader } from '../../../components/MiniLoader/MiniLoader';
import { asyncAddBookFrahments, asyncSetBookImage, changebookname, removebook, ShowHideBook } from '../../../redux/slices/EditSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Editbookpart, EditImage } from '../../../types/editSlice';
import { checkLoading } from '../../../Utils/EditPage/checkLoading';
import { BookPart } from '../BookPart/BookPart';
import './style.scss';

type props = {
    numcoll: number,
    numbook:number,
    name:string,
    image:EditImage,
    bookparts: Editbookpart[],
    showB:boolean,
}

export function Bookline({numcoll,numbook,name,bookparts,image,showB}:props){
    let loading = useAppSelector((state)=>state.edit.loading);
    let dispatch = useAppDispatch();
        
    let imagePrevieStyle = {
        backgroundImage:`url(${image.url})`,
    }
    let arrayFragmentsStyle={
        height:`${(bookparts.length+1)*45}px`,
    }
    async function ImageInputOnChange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files===null) return;
        let file = event.target.files![0];
        let payload = {
            img: file,
            numColl: numcoll,
            nummBook: numbook,
        };
        dispatch(asyncSetBookImage(payload));
        event.target.value='';
    }
    function showhide(){
        dispatch(ShowHideBook({
            numColl:numcoll,
            nummBook:numbook,
        }))
    }
    function addFragmentInput(event: React.ChangeEvent<HTMLInputElement>){
        let files = event.target.files;
        if (!files) return;
        let fileArray:File[]=Array.from(files);
        dispatch(asyncAddBookFrahments({numColl:numcoll,nummBook:numbook,files:fileArray}));
        event.target.value='';
    }

    let bookPartsBlocks = bookparts.map((elem,index)=>{
        return <BookPart
        numBook={numbook}
        numCol={numcoll}
        numFragment={index}
        part={elem}
        key={index}
        />
    });

    return <div className={`edit-book-line ${showB?'show':''}`}>
        <div className='book-block'>
            <input type="text" value={name} onChange={(event)=>dispatch(changebookname({Collnum: numcoll, Booknum:numbook, newName:event.target.value}))}/>
            <div className='symb' onClick={showhide}></div>
            <div className='delete' onClick={()=>dispatch(removebook({Collnum: numcoll, Booknum:numbook}))}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
            <div className={`add-imageforbook ${image.url?'haveimage':''} ${image.status==='error'?'error':''} ${image.status==='loading'?'loading':''}`}>
                <div className='image-previe' style={image.status==='loadend'?imagePrevieStyle:{}}>
                    {image.status==='loading'?<MiniLoader/>:<></>}
                    {image.status==='error'?
                    <span>Ошибка</span>:<></>}
                </div>
                <span>загрузить картинку</span>
                <input type="file" accept="image/*" onChange={ImageInputOnChange}/>
            </div>
            <div className={`status-circle ${checkLoading(bookparts)}`}></div>
        </div>
        <div className='array-fragments' style={arrayFragmentsStyle}>
            {bookPartsBlocks}
            <div className='add-fragments-button'>
                <span>{loading?'Дождитесь другой загрузки':'Загрузить фрагменты'}</span>
                {loading?<></>:
                <input type="file" accept="audio/*" onChange={addFragmentInput} multiple />}
            </div>
        </div>
        {(bookparts.length>9)?<>
            <div className={`scrol-icon ${showB?'show':''}`}></div>
            <div className={`scrol-icon two ${showB?'show':''}`}></div>
        </>:<></>}
    </div>
}
import { useEffect, useRef, useState } from 'react';
import { MiniLoader } from '../../../components/MiniLoader/MiniLoader';
import { asyncAddBookFrahments, asyncSetBookImage, changebookname, removebook, ShowHideBook } from '../../../redux/slices/EditSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Editbookpart, EditImage } from '../../../types/editSlice';
import { checkLoading } from '../../../Utils/EditPage/checkLoading';
import { moveHandler } from '../../../Utils/EditPage/dropHand';
import { BookPart } from '../BookPart/BookPart';
import './style.scss';

type props = {
    numcoll: number,
    numbook:number,
    name:string,
    image:EditImage,
    bookparts: Editbookpart[],
    show:boolean,
    canMove:boolean,
}

export function Bookline({numcoll,numbook,name,bookparts,image,show,canMove}:props){
    let dispatch = useAppDispatch();
    let loading = useAppSelector((state)=>state.edit.loading);
    let dpopElement = useAppSelector((state)=>state.edit.dpopElement);
    let dpopType = useAppSelector((state)=>state.edit.dpopType);

    let [renderbooks,setrenderbooks]=useState(false);
    let timoutID = useRef<NodeJS.Timeout|null>(null);
    useEffect(()=>{
        if (timoutID.current) clearTimeout(timoutID.current);
        if (show){
            setrenderbooks(true);
        }else{
            timoutID.current = setTimeout(()=>{
                setrenderbooks(false);
            },300);
        }
    },[show]);

    let bookPartsBlocks = renderbooks?bookparts.map((elem,index)=>{
        return <BookPart
        numBook={numbook}
        numCol={numcoll}
        part={elem}
        key={index}
        />
    }):<></>;

    
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
    function addFragmentInput(event: React.ChangeEvent<HTMLInputElement>){
        if (!event.target.files) return;
        let fileArray:File[]=Array.from(event.target.files);
        dispatch(asyncAddBookFrahments({numColl:numcoll,nummBook:numbook,files:fileArray}));
        event.target.value='';
    }

    let Arrayfragments = useRef<HTMLDivElement>(null);
    function scrollFragmentsBlock(to:'start'|'end'){
        if (!Arrayfragments.current) return console.log('none');
        let block = Arrayfragments.current;
        to ==='start'?block.scrollTo({top:0}):block.scrollTo({top:block.scrollHeight});
    }
    let [scrolparam,setscrolparam] = useState<'start'|'end'|''>('end');
    function onscroll(){
        if (!Arrayfragments.current) return console.log('none');
        let block = Arrayfragments.current;
        let scrollTop = block.scrollTop;
        let scrollBottom = block.scrollHeight-block.clientHeight-block.scrollTop;

        if (scrollTop===0 && scrollBottom>10 && scrolparam!=='start') setscrolparam('start');
        if (scrollTop>40 && scrollBottom<10 && scrolparam!=='end') setscrolparam('end');
        if (scrollTop>40 && scrollBottom>40 && scrolparam!=='') setscrolparam('');
    }

    return <div className={`edit-book-line ${show?'show':''}`}>
        <div className={`book-block ${(dpopType==='book'&& dpopElement===numbook)?'dropImpOpacity':''}`}>
            <input type="text" value={name} onChange={(event)=>dispatch(changebookname({Collnum: numcoll, Booknum:numbook, newName:event.target.value}))}/>
            <div className='symb' onClick={()=>dispatch(ShowHideBook(numbook))}></div>
            <div className='delete' onClick={()=>dispatch(removebook({Collnum: numcoll, Booknum:numbook}))}>
                <div className='try'></div>
                <div className='try'></div>
            </div>
            <div className={`add-imageforbook ${image.url?'haveimage':''} ${image.status==='error'?'error':''} ${image.status==='loading'?'loading':''}`}>
                <div className='image-previe' style={{backgroundImage:`url(${image.status==='loadend'?image.url:''})`}}>
                    {image.status==='loading'?<MiniLoader/>:<></>}
                    {image.status==='error'?
                    <span>Ошибка</span>:<></>}
                </div>
                <span>обложка</span>
                <input type="file" accept="image/*" onChange={ImageInputOnChange}/>
            </div>
            <div className={`status-circle ${checkLoading(bookparts)}`}></div>
            <div onMouseDown={(canMove && !loading)?(event)=>{moveHandler(event,'book',numbook)}:()=>{}} className={`change-position ${(canMove && !loading)?'active':''}`}></div>
        </div>
        <div ref={Arrayfragments} onScroll={onscroll} className='array-fragments' style={{height:`${(bookparts.length+1)*45}px`}}>
            {bookPartsBlocks}
            <div className='add-fragments-button'>
                <span>{loading?'Дождитесь другой загрузки':'Загрузить фрагменты'}</span>
                {!loading?<input type="file" accept="audio/*" onChange={addFragmentInput} multiple />:<></>}
            </div>
        </div>
        {(bookparts.length>9)?<>
            <div onClick={()=>scrolparam!=='start'?scrollFragmentsBlock('start'):()=>{}}
             className={`scrol-icon ${show?'show':''} ${scrolparam==='start'?'opacity':''}`}
             style={{}}></div>
            <div onClick={()=>scrolparam!=='end'?scrollFragmentsBlock('end'):()=>{}}
             className={`scrol-icon two ${show?'show':''} ${scrolparam==='end'?'opacity':''}`}
             style={{}}></div>
        </>:<></>}
    </div>
}
import { Loader } from "../../../components/Loader/Loader";
import { asyncSetMainImage } from "../../../redux/slices/EditSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../redux/store";

export function ImageInput(){
    let bookImage = useAppSelector((state:RootState)=>state.edit.bookImage);
    let dispatch = useAppDispatch();

    async function onchange(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.files===null) return;
        let file = event.target.files![0];
        dispatch(asyncSetMainImage(file));
        event.target.value='';
    }

    let activeimageStyle = {
        backgroundImage:`url(${bookImage.url})`,
    }

    return <>
        <div className={`book-image ${bookImage.status==='loadend'?"haveimage":''}`}>
            <div className='activeimage' style={bookImage.status==='loadend'?activeimageStyle:{}}>
                {bookImage.status==='loading'?<Loader/>:<></>}
                {bookImage.status==='error'?<>
                <span>Ошибка</span>
                <span>загрузите сного</span>
                </>:<></>}
                {bookImage.status!=='loading'?<input type="file" accept="image/*" onInput={onchange}/>:<></>}
            </div>
        </div>
    </>
}
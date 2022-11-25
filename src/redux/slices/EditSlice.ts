import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendFileToBackend } from "../../api/sendFileToBackend";
import { Editbookpart, EditState } from "../../types/editSlice";
import { createID } from "../../Utils/other/createId";
import { getAudioSize } from "../../Utils/other/getaudiosize";

let initialState:EditState ={
    href:'',
    collName:'Name Collection',
    authtorName:'Name authtor',
    description:'description of collection',
    bookImage:{url:'http://localhost:3000/static/media/img1.a13b7f9a6e77a8409bdb.jpg',googleid:'',status:'loadend'},
    collections: [],
    removeOnCancel:[],
    removeOnSave:[],
};

let EditSlice = createSlice({
    name:'edit',
    initialState,
    reducers:{
        setcollname(state,action:PayloadAction<string>){
            state.collName=action.payload;
        },
        setauthtorname(state,action:PayloadAction<string>){
            state.authtorName=action.payload;
        },
        setdescription(state,action:PayloadAction<string>){
            state.description=action.payload;
        },
        setSeriasImage(state,action:PayloadAction<{url:string,googleid:string,status:'loadend'|'loading'|'error',}>){
            let {url,googleid,status}=action.payload;

            state.bookImage={
                url,
                googleid,
                status,
            };
        },
        addcoll(state){
            let arr = state.collections;
            let len = arr.length;

            let name:string = 'Collection '+len;

            arr.push({
                name,
                books:[]
            })

            state.collections=arr;
        },
        removecoll(state,action:PayloadAction<number>){
            let arr = state.collections;
            let num = action.payload;

            let rez = arr.filter((elem,index)=>index===num?false:true);
            state.collections=rez;
        },
        changecollname(state,action:PayloadAction<{num:number, name:string}>){
            let {num,name}=action.payload;
            state.collections[num].name=name;
        },
        addbook(state,action:PayloadAction<number>){
            let collnum = action.payload;
            let arr = state.collections;

            arr[collnum].books.push({
                name:'Book '+arr[collnum].books.length,
                image:{url:'',googleid:'',status:'loadend'},
                bookparts:[],
                booklength:0,
                show:false,
            })
            state.collections=arr;
        },
        removebook(state,action:PayloadAction<{Collnum:number, Booknum:number}>){
            let {Collnum,Booknum} = action.payload;
            let colls = state.collections;
            let books = state.collections[Collnum].books;

            colls[Collnum].books=books.filter((elem,index)=>Booknum===index?false:true);
            state.collections=colls;
        },
        changebookname(state,action:PayloadAction<{Collnum:number, Booknum:number, newName: string}>){
            let {Collnum,Booknum,newName} = action.payload;
            let colls = state.collections;
            let books = state.collections[Collnum].books;

            colls[Collnum].books=books.map((elem,index)=>{
                if (Booknum!==index) return elem;
                return{
                    booklength:elem.booklength,
                    bookparts:elem.bookparts,
                    image:elem.image,
                    name:newName,
                }
            });
            state.collections=colls;
        },
        setBookImage(state,action:PayloadAction<{url:string,numColl:number,nummBook:number,googleid:string,status:'loadend'|'loading'|'error'}>){
            let {url, numColl, nummBook, status, googleid} = action.payload;

            let arr = state.collections;
            arr[numColl].books[nummBook].image={
                url,
                googleid,
                status,
            };
        },
        ShowHideBook(state,action:PayloadAction<{numColl:number,nummBook:number}>){
            let {numColl , nummBook} = action.payload;

            let colls = state.collections;
            colls[numColl].books[nummBook].show= !colls[numColl].books[nummBook].show;
            state.collections=colls;
        },
        addFragment(state,action:PayloadAction<{numColl:number,nummBook:number,lenght:number,size:number,status:'loadend'|'loading'|'error',googleid:string,url:string,id:string}>){
            let {numColl,nummBook,lenght,size,status,googleid,url,id} = action.payload;

            let colls = state.collections;

            let newFragment:Editbookpart = {
                id,
                url,
                lenght,
                size,
                status,
                googleid,
            }

            colls[numColl].books[nummBook].bookparts.push(newFragment);

        },
        removeFragment(state,action:PayloadAction<{numCol:number,numBook:number,numFragment:number}>){
            let {numCol, numBook, numFragment} = action.payload;

            let coll = state.collections;
            coll[numCol].books[numBook].bookparts=coll[numCol]
            .books[numBook].bookparts.filter((elem,index)=>index===numFragment?false:true);

            state.collections=coll;
        },
        changeFragment(state,action:PayloadAction<{numColl:number,nummBook:number,lenght:number,size:number,status:'loadend'|'loading'|'error',googleid:string,url:string,id:string}>){
            let {numColl,nummBook,lenght,size,status,googleid,url,id} = action.payload;
            let colls = state.collections;
            let Fragment:Editbookpart = {
                id,
                url,
                lenght,
                size,
                status,
                googleid,
            }
            let bookparts = colls[numColl].books[nummBook].bookparts;
            bookparts = bookparts.map((elem,index)=>{
                if (elem.id===id) return Fragment;
                return elem;
            });
            colls[numColl].books[nummBook].bookparts = bookparts;
            state.collections=colls;
        },
        addToSaveRemoveList(state,action:PayloadAction<string>){
            let arr = state.removeOnSave;
            arr.push(action.payload);
            state.removeOnSave=arr;
        },
        addToCancelRemoveList(state,action:PayloadAction<string>){
            let arr = state.removeOnCancel;
            arr.push(action.payload);
            state.removeOnCancel=arr;
        },
    },
})

export const {
    setcollname,
    setauthtorname,
    setdescription,
    setSeriasImage,
    addcoll,
    removecoll,
    changecollname,
    addbook,
    removebook,
    changebookname,
    setBookImage,
    ShowHideBook,
    addFragment,
    removeFragment,
    changeFragment,
} = EditSlice.actions;
export default EditSlice.reducer;

export const asyncSetMainImage = createAsyncThunk(
    'edit/asyncSetMainImage',
    async (param:File, thunkApi) => {
        let {dispatch}= thunkApi;
        let payload:{url:string,googleid:string,status:'loadend'|'loading'|'error',} = {
            url:'',
            googleid: '',
            status:'loading',
        };
        dispatch(setSeriasImage(payload));
        let res = await sendFileToBackend(param);

        if (res==='error'){
            let payload:{url:string,googleid:string,status:'loadend'|'loading'|'error',} = {
                url:'',
                googleid: '',
                status:'error',
            };
            dispatch(setSeriasImage(payload));
        }else{
            let payload:{url:string,googleid:string,status:'loadend'|'loading'|'error',} = {
                url:res.url,
                googleid:res.googleid,
                status:'loadend',
            };
            dispatch(setSeriasImage(payload));
        }
    }
);
export const asyncSetBookImage = createAsyncThunk(
    'edit/asyncSetBookImage',
    async (params:{img:File,numColl:number,nummBook:number}, thunkApi) => {
        let {img,numColl,nummBook} = params;
        let {dispatch}= thunkApi;
        let payload:{url:string,numColl:number,nummBook:number,googleid:string,status:'loadend'|'loading'|'error'} = {
            numColl,
            nummBook,
            url:'wait',
            googleid: '',
            status:'loading',
        };
        dispatch(setBookImage(payload));
        let res = await sendFileToBackend(img);

        if (res==='error'){
            let payload:{url:string,numColl:number,nummBook:number,googleid:string,status:'loadend'|'loading'|'error'} = {
                numColl,
                nummBook,
                url:'error',
                googleid: '',
                status:'error',
            };
            dispatch(setBookImage(payload));
        }else{
            let payload:{url:string,numColl:number,nummBook:number,googleid:string,status:'loadend'|'loading'|'error'} = {
                numColl,
                nummBook,
                url: res.url,
                googleid: res.googleid,
                status: 'loadend',
            };
            dispatch(setBookImage(payload));
        }
    }
);
export const asyncAddBookFrahment = createAsyncThunk(
    'edit/asyncAddBookFrahment',
    async (params:{numColl:number,nummBook:number,file:File}, thunkApi) => {
        let {dispatch}=thunkApi;
        let {numColl,nummBook,file}=params;
        let id = createID();

        let payload:{numColl:number,nummBook:number,lenght:number,size:number,status:'loadend'|'loading'|'error',googleid:string,url:string, id:string} = {
            id,
            numColl,
            nummBook,
            lenght:0,
            size:0,
            status:'loading',
            googleid:'',
            url:'',
        }
        dispatch(addFragment(payload));
        let res = await sendFileToBackend(file);

        if (res==='error'){
            let payload:{numColl:number,nummBook:number,lenght:number,size:number,status:'loadend'|'loading'|'error',googleid:string,url:string, id:string} = {
                id,
                numColl,
                nummBook,
                lenght:0,
                size:0,
                status:'error',
                googleid:'',
                url:'',
            }
            dispatch(changeFragment(payload));
        }else{
            let lenght = await getAudioSize(res.url);
            let size = file.size;

            let payload:{numColl:number,nummBook:number,lenght:number,size:number,status:'loadend'|'loading'|'error',googleid:string,url:string, id:string} = {
                id,
                numColl,
                nummBook,
                lenght,
                size,
                status:'loadend',
                googleid:res.googleid,
                url:res.url,
            }
            dispatch(changeFragment(payload));
        }
    }
)
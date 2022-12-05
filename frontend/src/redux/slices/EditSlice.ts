import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendFileToBackend } from "../../api/editColls/sendFileToBackend";
import { Editbookpart, EditState, payloadFragmentType } from "../../types/editSlice";
import { saveController } from "../../Utils/apiUtils/abortFileUpload";
import { checkContainFragment, getstoplist } from "../../Utils/EditPage/forLoadFiles";
import { createID } from "../../Utils/other/createId";
import { getAudioSize } from "../../Utils/other/getaudiosize";
import { RootState} from "../store";

let initialState:EditState ={
    href:'',
    collName:'',
    authtorName:'',
    description:'',
    bookImage:{url:'',googleid:'',status:'loadend'},
    collections: [],
    removeOnCancel:[],
    removeOnSave:[],
    loading:false,
    showColl:-1,
    showBook:-1,
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
        showHideColl(state,action:PayloadAction<number>){
            let numCol = action.payload;
            if (state.showColl===numCol){
                state.showColl=-1;
            }else{
                state.showColl=action.payload;
            }
            state.showBook=-1;
        },
        removecoll(state,action:PayloadAction<number>){
            let colls = state.collections;
            let num = action.payload;


            //занести фрагменты колекции в список на удаление 
            let removeList = state.removeOnSave;
            colls[num].books.forEach((book)=>{
                book.bookparts.forEach((fragment)=>{
                    removeList.push(fragment.googleid);
                })
            })
            state.removeOnSave=removeList;
            //


            let rez = colls.filter((elem,index)=>index===num?false:true);
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
            })
            state.collections=arr;
        },
        removebook(state,action:PayloadAction<{Collnum:number, Booknum:number}>){
            let {Collnum,Booknum} = action.payload;
            let colls = state.collections;
            let books = state.collections[Collnum].books;

            //занести фрагменты книги в список на удаление 
            let removeList = state.removeOnSave;
            books[Booknum].bookparts.forEach((fragment)=>{
                removeList.push(fragment.googleid);
            })
            state.removeOnSave=removeList;
            //

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
        ShowHideBook(state,action:PayloadAction<number>){
            let numBook = action.payload;
            if (state.showBook===numBook){
                state.showBook=-1;
            }else{
                state.showBook=action.payload;
            }
        },
        addFragment(state,action:PayloadAction<payloadFragmentType>){
            let {numColl,nummBook,lenght,size,status,googleid,url,id,name} = action.payload;

            let colls = state.collections;

            let newFragment:Editbookpart = {
                name,
                id,
                url,
                lenght,
                size,
                status,
                googleid,
            }

            colls[numColl].books[nummBook].bookparts.push(newFragment);
            state.collections=colls;
        },
        removeFragment(state,action:PayloadAction<{numCol:number,numBook:number,partID:string}>){
            let {numCol, numBook, partID} = action.payload;
            let colls = state.collections;

            //занести фрагмент в список на удаление 
            let removeList = state.removeOnSave;
            removeList.push(colls[numCol].books[numBook]
                .bookparts.filter((elem)=>elem.id===partID?true:false)[0].googleid);
            state.removeOnSave=removeList;
            //

            colls[numCol].books[numBook].bookparts=colls[numCol]
            .books[numBook].bookparts.filter((elem)=>elem.id===partID?false:true);
            
            state.collections=colls;
        },
        changeFragment(state,action:PayloadAction<payloadFragmentType>){
            let {numColl,nummBook,lenght,size,status,googleid,url,id,name} = action.payload;
            let colls = state.collections;
            let Fragment:Editbookpart = {
                name,
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
        setEditState(state,action:PayloadAction<EditState>){
            let {href, collName , authtorName, description, bookImage, collections} = action.payload;

            state.href = href;
            state.collName = collName;
            state.authtorName = authtorName;
            state.description = description;
            state.bookImage = bookImage;
            state.collections = collections;
            state.removeOnCancel=[];
            state.removeOnSave=[];
        },
        setloading(state,action:PayloadAction<boolean>){
            state.loading=action.payload;
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
    addToSaveRemoveList,
    addToCancelRemoveList,
    setEditState,
    setloading,
    showHideColl,
} = EditSlice.actions;
export default EditSlice.reducer;

export const asyncSetMainImage = createAsyncThunk(
    'edit/asyncSetMainImage',
    async (param:File, thunkApi) => {
        let {dispatch,getState}= thunkApi;
        let payload:{url:string,googleid:string,status:'loadend'|'loading'|'error',} = {
            url:'',
            googleid: '',
            status:'loading',
        };

        let state = getState() as RootState;
        let prevGoogleID = state.edit.bookImage.googleid;

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
            dispatch(addToSaveRemoveList(prevGoogleID));
            dispatch(addToCancelRemoveList(res.googleid));

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
        let {dispatch, getState}= thunkApi;

        let state = getState() as RootState;
        let prevGoogleID = state.edit.collections[numColl].books[nummBook].image.googleid;

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
            dispatch(addToSaveRemoveList(prevGoogleID));
            dispatch(addToCancelRemoveList(res.googleid));

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
export const asyncAddBookFrahments = createAsyncThunk(
    'edit/asyncAddBookFrahments',
    async (params:{numColl:number,nummBook:number,files:File[]}, thunkApi) => {
        let {dispatch,getState}=thunkApi;
        dispatch(setloading(true));
        let {numColl,nummBook,files} = params;

        let arrayFiles = files.map((file)=>{
            let id = createID();

            let payload:payloadFragmentType = {
                name:file.name,
                id,
                numColl,
                nummBook,
                lenght:0,
                size:0,
                status:'waitloading',
                googleid:'',
                url:'',
            }
            dispatch(addFragment(payload));

            return {
                file,
                partID:id,
            }
        })

        let successFragments:string[]=[];

        for(let part of arrayFiles){
            let book = (getState() as RootState).edit.collections[numColl].books[nummBook];
            if (!checkContainFragment(book,part.partID)) continue;

            let payload:payloadFragmentType = {
                name:part.file.name,
                id:part.partID,
                numColl,
                nummBook,
                lenght:0,
                size:0,
                status:'loading',
                googleid:'',
                url:'',
            }
            dispatch(changeFragment(payload));

            let size = part.file.size;
            let abortControler = new AbortController();
            saveController(abortControler);
            let res = await sendFileToBackend(part.file,abortControler);

            if (res==='error'){
                let payload:payloadFragmentType = {
                    name:part.file.name,
                    id:part.partID,
                    numColl,
                    nummBook,
                    lenght:0,
                    size:0,
                    status:'error',
                    googleid:'',
                    url:'',
                }
                dispatch(changeFragment(payload));

                let list = getstoplist(successFragments,part.partID,arrayFiles);
                for (let id of list){
                    dispatch(removeFragment({numCol:numColl,numBook:nummBook,partID:id}));
                }
                break;
            }else{
                dispatch(addToCancelRemoveList(res.googleid));
                let lenght = await getAudioSize(res.url);
                let payload:payloadFragmentType = {
                    name:part.file.name,
                    id:part.partID,
                    numColl,
                    nummBook,
                    lenght,
                    size,
                    status:'loadend',
                    googleid:res.googleid,
                    url:res.url,
                }
                successFragments.push(part.partID);

                dispatch(changeFragment(payload));
            }
        }
        saveController(null);
        dispatch(setloading(false));
    }
);

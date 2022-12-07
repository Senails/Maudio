import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendFileToBackend } from "../../api/editColls/sendFileToBackend";
import { Editbookpart, EditState, payloadFragmentType } from "../../types/editSlice";
import { saveController } from "../../Utils/apiUtils/abortFileUpload";
import { checkContainFragment, getstoplist } from "../../Utils/EditPage/forLoadFiles";
import { replaceParts } from "../../Utils/EditPage/replaceParts";
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
    dpopElement:-1,
    dpopType:'',
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
            let name:string = 'Collection '+state.collections.length;
            state.collections.push({name,books:[]});
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
            let num = action.payload;

            state.collections[num].books.forEach((book)=>{
                book.bookparts.forEach((fragment)=>{
                    state.removeOnSave.push(fragment.googleid);
                })
                state.removeOnSave.push(book.image.googleid);
            })

            state.collections=state.collections.filter((elem,index)=>index===num?false:true);
        },
        changecollname(state,action:PayloadAction<{num:number, name:string}>){
            let {num,name}=action.payload;
            state.collections[num].name=name;
        },
        addbook(state,action:PayloadAction<number>){
            let collnum = action.payload;

            state.collections[collnum].books.push({
                name:'Book '+state.collections[collnum].books.length,
                image:{url:'',googleid:'',status:'loadend'},
                bookparts:[],
            })
        },
        removebook(state,action:PayloadAction<{Collnum:number, Booknum:number}>){
            let {Collnum,Booknum} = action.payload;

            state.collections[Collnum].books[Booknum].bookparts.forEach((fragment)=>{
                state.removeOnSave.push(fragment.googleid);
            })
            state.removeOnSave.push(state.collections[Collnum].books[Booknum].image.googleid);

            state.collections[Collnum].books=state.collections[Collnum].books.filter((elem,index)=>Booknum===index?false:true);
        },
        changebookname(state,action:PayloadAction<{Collnum:number, Booknum:number, newName: string}>){
            let {Collnum,Booknum,newName} = action.payload;
            state.collections[Collnum].books[Booknum].name=newName;
        },
        setBookImage(state,action:PayloadAction<{url:string,numColl:number,nummBook:number,googleid:string,status:'loadend'|'loading'|'error'}>){
            let {url, numColl, nummBook, status, googleid} = action.payload;
            state.collections[numColl].books[nummBook].image={
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
            let bookparts = state.collections[numCol].books[numBook].bookparts;

            state.removeOnSave.push(state.collections[numCol].books[numBook]
            .bookparts.filter((elem)=>elem.id===partID?true:false)[0].googleid);

            bookparts = bookparts.filter((elem)=>elem.id===partID?false:true);
            state.collections[numCol].books[numBook].bookparts=bookparts;
        },
        changeFragment(state,action:PayloadAction<payloadFragmentType>){
            let {numColl,nummBook,lenght,size,status,googleid,url,id,name} = action.payload;
            let Fragment:Editbookpart = {
                name,
                id,
                url,
                lenght,
                size,
                status,
                googleid,
            }

            let bookparts = state.collections[numColl].books[nummBook].bookparts;
            bookparts = bookparts.map((elem,index)=>{
                if (elem.id===id) return Fragment;
                return elem;
            });

            state.collections[numColl].books[nummBook].bookparts = bookparts;
        },
        addToSaveRemoveList(state,action:PayloadAction<string>){
            state.removeOnSave.push(action.payload)
        },
        addToCancelRemoveList(state,action:PayloadAction<string>){
            state.removeOnCancel.push(action.payload)
        },
        setEditState(state,action:PayloadAction<EditState|null>){
            let editstate = action.payload;
            if (action.payload===null) editstate = initialState;
            let {href, collName , authtorName, description, bookImage, collections} = editstate!;

            state.href = href;
            state.collName = collName;
            state.authtorName = authtorName;
            state.description = description;
            state.bookImage = bookImage;
            state.collections = collections;
            state.removeOnCancel=[];
            state.removeOnSave=[];
            state.loading=false;
            state.showBook=-1;
            state.showColl=-1;
        },
        setloading(state,action:PayloadAction<boolean>){
            state.loading=action.payload;
        },
        setDropElem(state, action:PayloadAction<{num:number,type:'coll'|'book'|''}>){
            let {num, type} = action.payload;

            state.dpopElement=num;
            state.dpopType=type;
        },
        changePositiom(state, action:PayloadAction<{num:number,neednum:number,type:'coll'|'book'}>){
            let {neednum,num,type} = action.payload;
            let arr:any[];

            if (type==='coll'){
                arr=state.collections;
            }else{
                let numcoll=state.showColl;
                arr=state.collections[numcoll].books;
            }
            let resArr = replaceParts(arr,num,neednum);

            if (type==='coll'){
                state.collections=resArr;
            }else{
                let numcoll=state.showColl;
                let colls = state.collections;
                colls[numcoll].books=resArr;
                state.collections=colls;
            }
            state.dpopElement=neednum;
        }
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
    setDropElem,
    changePositiom,
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
            console.log(`загрузка ${part.file.name} начата`)
            let res = await sendFileToBackend(part.file,abortControler);
            console.log(`загрузка ${part.file.name} окончена`)

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

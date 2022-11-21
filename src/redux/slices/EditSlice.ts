import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookpart, Collection } from "../../types/pleerSlice";


type EditState = {
    collName:string,
    authtorName:string,
    description:string,
    bookImage:string,
    collections: Collection[],
}

let initialState:EditState ={
    collName:'Name Collection',
    authtorName:'Name authtor',
    description:'description of collection',
    bookImage:'http://localhost:3000/static/media/img1.a13b7f9a6e77a8409bdb.jpg',
    collections: [],
}

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
        setSeriasImage(state,action:PayloadAction<string>){
            state.bookImage=action.payload;
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
                image:'',
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
        setBookImage(state,action:PayloadAction<{imgSrc:string,numColl:number,nummBook:number}>){
            let {imgSrc, numColl, nummBook} = action.payload;

            let arr = state.collections;
            arr[numColl].books[nummBook].image=imgSrc;
        },
        ShowHideBook(state,action:PayloadAction<{numColl:number,nummBook:number}>){
            let {numColl , nummBook} = action.payload;

            let colls = state.collections;
            colls[numColl].books[nummBook].show= !colls[numColl].books[nummBook].show;
            state.collections=colls;
        },
        addFragment(state,action:PayloadAction<{numColl:number,nummBook:number}>){
            let {numColl,nummBook} = action.payload;

            let colls = state.collections;

            let newFragment:bookpart = {
                url:'',
                lenght:0,
                status:'loading',
            }

            colls[numColl].books[nummBook].bookparts.push(newFragment);

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
} = EditSlice.actions;
export default EditSlice.reducer
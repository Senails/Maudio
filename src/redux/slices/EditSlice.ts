import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Collection } from "../../types/pleerSlice";


type EditState = {
    collName:string,
    authtorName:string,
    description:string,
    bookImage:string,
    collections: Collection[],
}

let initialState:EditState ={
    collName:'New Coll',
    authtorName:'hz authtor',
    description:'none description',
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
        setbookImage(state,action:PayloadAction<string>){
            state.bookImage=action.payload;
        },
        addcoll(state){
            let arr = state.collections;
            let len = arr.length;

            let name:string = 'NColl'+len;

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
    },
})

export const {
    setcollname,
    setauthtorname,
    setdescription,
    setbookImage,
    addcoll,
    removecoll,
    changecollname,
} = EditSlice.actions;
export default EditSlice.reducer
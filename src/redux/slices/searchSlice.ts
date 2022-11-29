import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type BookCardtype = {
    href:string;
    img:string;
    bookcount:number;
    authtor:string;
    name:string;
    description?:string;
}

type searchState = {
    arrayCard: BookCardtype[];
    searchString: string;
    
}

let initialState:searchState = {
    arrayCard:[],
    searchString:'',
};

export const searchSlise = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setsearch(state, action: PayloadAction<string>){
            state.searchString = action.payload;
        },
        setArrayCard(state,action: PayloadAction<BookCardtype[]>){
            state.arrayCard=action.payload;
        }
    },
});

export const {setsearch,setArrayCard} = searchSlise.actions;
export default searchSlise.reducer
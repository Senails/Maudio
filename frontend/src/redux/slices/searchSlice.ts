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
    sortingParam: string;
    filterParam: string;
}

let initialState:searchState = {
    arrayCard:[],
    searchString:'',
    sortingParam:'без сортировки',
    filterParam:'все',
};

export const searchSlise = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setsearch(state, action: PayloadAction<string>){
            state.searchString = action.payload;
        },
        setSorting(state,action: PayloadAction<string>){
            state.sortingParam=action.payload;
        },
        setFilter(state,action: PayloadAction<string>){
            state.filterParam=action.payload;
        },
        setArrayCard(state,action: PayloadAction<BookCardtype[]>){
            state.arrayCard=action.payload;
        }
    },
});

export const {
    setsearch,
    setArrayCard,
    setSorting,
    setFilter,
} = searchSlise.actions;
export default searchSlise.reducer
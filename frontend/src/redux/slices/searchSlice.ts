import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetLikeOnBackend } from "../../api/bookActions/setLikeOnBackend";


export type BookCardtype = {
    _id:string,
    href:string;
    img:string;
    authtor:string;
    name:string;
    like?:boolean;
    reiting?:number;
    progress?:number;
};

type searchState = {
    arrayCard: BookCardtype[];
    searchString: string;
    sortingParam: string;
    filterParam: string;
};

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
        },
        resetState(state){
            let {filterParam, sortingParam, searchString} = initialState;

            state.filterParam=filterParam;
            state.searchString=searchString;
            state.sortingParam=sortingParam;
        },
        setlike(state,action: PayloadAction<{num:number,like:boolean}>){
            let {num , like} = action.payload;
            
            state.arrayCard[num].like=like;
        },
    },
});

export const {
    setsearch,
    setArrayCard,
    setSorting,
    setFilter,
    resetState,
    setlike,
} = searchSlise.actions;
export default searchSlise.reducer

export const userlike = createAsyncThunk(
    'search/setlike',
    async (params:{_id:string,num:number,like:boolean},thunkApi)=>{
        let {dispatch} = thunkApi;
        let {_id,num,like} = params;

        dispatch(setlike({num,like}));
        SetLikeOnBackend(_id,like);
    }
)
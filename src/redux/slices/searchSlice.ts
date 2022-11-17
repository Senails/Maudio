import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type BookCardtype = {
    href:string;
    img:string;
    bookcount:number;
    authtor:string;
    name:string;
}

type searchState = {
    arrayCard: BookCardtype[];
    searchString: string;
    
}

let book: BookCardtype = {
    href:'/bookInfo/MaxFrei',
    img: './img1.jpg',
    bookcount: 12,
    authtor:'Макс Фрай',
    name:'Сэр Макс из Ехо1',
}

let books = [book,book,book,book,book,book];

let initialState:searchState = {
    arrayCard:books,
    searchString:'',
};

export const searchSlise = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setsearch(state, action: PayloadAction<string>){
            state.searchString = action.payload;
        },
        loadmore(state){
            state.arrayCard=[...books,...books];
        }
    },
});


export const {setsearch,loadmore} = searchSlise.actions;
export default searchSlise.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export type BookCardtype = {
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
    img: './img1.jpg',
    bookcount: 12,
    authtor:'Макс Фрай',
    name:'Сэр Макс из Ехо',
}



let initialState:searchState = {
    arrayCard:[book,book,book,book,book,book],
    searchString:'',
};

export const searchSlise = createSlice({
    name: 'search',
    initialState,
    reducers:{
        setsearch(state, action: PayloadAction<string>){
            state.searchString = action.payload;
        }
    },
});


export const {setsearch} = searchSlise.actions;
export default searchSlise.reducer
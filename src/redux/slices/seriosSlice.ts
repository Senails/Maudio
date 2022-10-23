import { createSlice } from "@reduxjs/toolkit";
import { Book } from "./pleerSlice";




type Collection = {
    name: string,
    books: Book[];
}

type Seria = {
    name: string,
    description: string,
    authtor: string,
    collections: Collection[],
}

type seriosState = {
    serios: Seria,
    activecollection : number,
    activebook: number,
}

let initialState={

}

let SeriosSlice = createSlice({
    name: "collection",
    initialState,
    reducers:{
        
    }
})
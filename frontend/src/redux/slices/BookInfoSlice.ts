import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookData, FetchComment } from "../../api/getbookdata";


type BookInfoState = {
    _id:string;
    name:string;
    authtor:string;
    reiting:number;
    description:string;
    image:string;
    bookcount:number;

    comments?:FetchComment[];
    userreiting?:number;
    progress?:number;
    like?:boolean;
}

let initialState:BookInfoState = {
    _id:'',
    name:'',
    authtor:'',
    reiting: 0,
    userreiting:0,
    description:``,
    image:'',
    bookcount:12,
    comments:[],
    like: false,
    progress: 0,
}

export const BookInfoSlice = createSlice({
    name:'bookinfo',
    initialState,
    reducers:{
        setUserReiting(state,action: PayloadAction<number>){
            state.userreiting=action.payload;
        },
        setLike(state,action: PayloadAction<boolean>){
            state.like=action.payload;
        },
        setInfoState(state,action:PayloadAction<BookData>){
            let {
                _id,
                Reiting,
                name,
                authtorname,
                bookcount,
                comments,
                description,
                image,
                like,
                progress,
                userReiting,
            } = action.payload;

            state._id=_id;
            state.name=name;
            state.authtor=authtorname;
            state.bookcount=bookcount;
            state.description=description;
            state.image=image.url;
            state.reiting=Reiting;

            state.comments=comments;
            state.like=like;
            state.progress=progress;
            state.userreiting=userReiting;
        },
        addComment(state,action:PayloadAction<FetchComment>){
            if (state.comments){
                state.comments.push(action.payload);
            }else{
                state.comments=[action.payload]
            }
        },
    }
})


export const {
    setUserReiting,
    setLike,
    setInfoState,
    addComment,
} = BookInfoSlice.actions;

export default BookInfoSlice.reducer;
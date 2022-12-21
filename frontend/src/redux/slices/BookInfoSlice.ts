import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeCommentOnBackend } from "../../api/bookActions/removeComment";
import { saveComment } from "../../api/bookActions/saveComment";
import { SetLikeOnBackend } from "../../api/bookActions/setLikeOnBackend";
import { SetCenseOnBackend } from "../../api/bookActions/setReiting";
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
        removeComment(state,action:PayloadAction<FetchComment>){
            let selectComment = action.payload;
            if (state.comments){
                state.comments= state.comments.filter((comment)=>{
                    if (comment.username===selectComment.username 
                        && comment.date === selectComment.date){
                        return false;
                    }
                    return true;
                })
            }
        },
    }
})


export const {
    setUserReiting,
    setLike,
    setInfoState,
    addComment,
    removeComment,
} = BookInfoSlice.actions;

export default BookInfoSlice.reducer;

export const userSetLike = createAsyncThunk(
    'bookinfo/userSetLike',
    async (params:{_id:string,like:boolean},thunkApi)=>{
        let {dispatch} = thunkApi;
        let {_id,like} = params;

        dispatch(setLike(like));
        SetLikeOnBackend(_id,like);
    }
)
export const userSelectReiting = createAsyncThunk(
    'bookinfo/userSelectReiting',
    async (params:{_id:string,reit:number},thunkApi)=>{
        let {dispatch} = thunkApi;
        let {_id,reit} = params;

        dispatch(setUserReiting(reit));
        SetCenseOnBackend(_id,reit);
    }
)


export const userAddComment = createAsyncThunk(
    'bookinfo/userAddComment',
    async (params:{_id:string,comm:FetchComment},thunkApi)=>{
        let {dispatch} = thunkApi;
        let {_id,comm} = params;

        dispatch(addComment(comm));
        saveComment(_id,comm);
    }
)
export const userRemoveComment = createAsyncThunk(
    'bookinfo/userRemoveComment',
    async (params:{_id:string,comm:FetchComment} , thunkApi)=>{
        let {dispatch} = thunkApi;
        let {_id,comm} = params;

        dispatch(removeComment(comm));
        removeCommentOnBackend(_id,comm);
    }
)
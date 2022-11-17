import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FindFragment } from '../../Utils/forPleer/findfragment';
import { RootState } from '../store';
import { ChangeVolume } from '../../Utils/forPleer/changevolum';
import { findnextbook } from '../../Utils/forPleer/findnextbook';
import { setbook } from '../../Utils/forPleer/setbook';
import { pleerState, Seria } from '../../types/pleerSlice';
import { getvolume, savevolume } from '../../Utils/forPleer/savevolume';
import { SmallNumber } from '../../Utils/forPleer/SmallNumber';

let initialSeria: Seria = {
    name:'',
    description:'',
    authtor:'',
    collections:[
        {
            name:'',
            books:[
                {
                    name:'',
                    image: "",
                    booklength: 0,
                    bookparts: [
                    {lenght:0, url:""},                                   
                ]
                },
            ]
        },
    ]
}

let initialState:pleerState = {
    seria:initialSeria,
    activecollection : 0,
    activebook: 0,
    bookMap: initialSeria.collections[0].books[0],
    activeSrc:"",
    activefragment:0,
    playpause: 'pause',
    volume: getvolume(),
    userVolume:getvolume(),
    lenght:0,
    pleerlenght:0,
    block: false,
};
  
export const pleerSlice = createSlice({
    name: 'pleer',
    initialState,
    reducers:{
        setplay(state, action:PayloadAction<'pause'|'play'>){
            state.playpause=action.payload;
        },
        setvolume(state, action:PayloadAction<number>){
            state.volume = action.payload;
        },
        setlenght(state, action:PayloadAction<number>){
            let lenght = 0;
            for(let i=0; i<state.activefragment;i++){
                lenght+=state.bookMap.bookparts[i].lenght;
            }
            lenght+=action.payload;
            state.lenght=lenght;

            if (lenght>=state.bookMap.booklength){
                let {coll , book}=findnextbook(state);
                if (coll!==-1){
                    setbook(state,coll,book,state.playpause);
                }else{
                    let {src,lenght, activeFragment}= FindFragment(state.bookMap,0);
                    state.activefragment=activeFragment;
                    state.activeSrc = src;
                    state.pleerlenght=lenght;
                    state.playpause='pause';
                }
                return;
            }

            if (action.payload>=state.bookMap.bookparts[state.activefragment].lenght){
                let {src,lenght, activeFragment}= FindFragment(state.bookMap,action.payload);

                state.activefragment=activeFragment;
                state.activeSrc = src;
                state.pleerlenght=lenght;
            }
        },
        setAllState(state,action:PayloadAction<Seria>){
            let seria = action.payload;

            state.seria=seria;
            state.activecollection=0;
            state.activebook=0;
            state.bookMap=seria.collections[0].books[0];
            state.activeSrc=seria.collections[0].books[0].bookparts[0].url;
            state.activefragment=0;
            state.playpause='pause';
            state.lenght=0;
            state.pleerlenght=0+SmallNumber();
        },
        changebook(state, action:PayloadAction<{coll:number,book:number}>){
            let {coll , book}=action.payload
            if (state.activecollection===coll && state.activebook===book) return;
            
            setbook(state,coll,book,state.playpause);
        },
        UserSelectLenght(state, action:PayloadAction<number>){
            state.lenght=action.payload;

            if (action.payload>=state.bookMap.booklength){
                let {coll , book}=findnextbook(state);
                if (coll!==-1){
                    setbook(state,coll,book,state.playpause);
                }else{
                    let {src,lenght, activeFragment}= FindFragment(state.bookMap,0);
                    state.activefragment=activeFragment;
                    state.activeSrc = src;
                    state.pleerlenght=lenght;
                    state.playpause='pause';
                }
                return;
            }

            let {src,lenght, activeFragment}= FindFragment(state.bookMap,action.payload);
            state.activefragment=activeFragment;
            state.activeSrc = src;
            state.pleerlenght=lenght+SmallNumber();
        },
        UserSelectVolume(state, action:PayloadAction<number>){
            state.userVolume = action.payload;
            if (state.playpause==='play') state.volume=action.payload;
            savevolume(action.payload);
        },
    },
})

export const {setvolume,setlenght,UserSelectLenght,UserSelectVolume,setplay,changebook,setAllState} = pleerSlice.actions;
export default pleerSlice.reducer
export const setpause = createAsyncThunk(
    'pleer/setpause',
    async (param:"pause" | "play", thunkApi) => {
        let {dispatch , getState}= thunkApi;
        let state=<RootState> getState();

        if (state.pleer.block) return;

        if (param==='play'){
            dispatch(setplay(param));
            ChangeVolume(state.pleer.volume,state.pleer.userVolume,300,dispatch);
        }else{
            await ChangeVolume(state.pleer.volume,0,300,dispatch);
            dispatch(setplay(param));
        }
    return;
    }
)
import { AnyAction, createAsyncThunk, createSlice, ThunkDispatch } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FindFragment } from '../../Utils/findfragment';
import { sleep } from '../../Utils/sleep';
import { RootState } from '../store';



type bookpart={
    lenght:number;
    url:string;
}

export type Book= {
    name: string;
    image:string;
    booklength: number;
    bookparts: bookpart[];
}

type pleerState={
    bookMap:Book,
    activeSrc: string,
    activefragment:number,
    playpause:'pause'|'play',
    volume:number,
    lenght:number,
    pleerlenght:number,
}


let book : Book={
    name: 'Чужак',
    image: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRCia7uc-NhYKl6xiMwdjLB9mIyAua4xYhH4co8b-bHJ0PcCGyhiulzHmJ6IdTsVmJSSoSbjm8=w1920-h902",
    booklength: 440.816583*2,
    bookparts: [
        {lenght:440.816583, url:"./1245511.mp3"},
        {lenght:440.816583, url:"./1245511.mp3"}
    ],
}

let initialState:pleerState = {
    bookMap: book,
    activeSrc:"./1245511.mp3",
    activefragment:0,
    playpause: 'pause',
    volume: 0.5,
    lenght:0,
    pleerlenght:0,
}

  
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
                state.playpause='pause';
                return;
            }

            if (action.payload>=state.bookMap.bookparts[state.activefragment].lenght){
                let {src,lenght, activeFragment}= FindFragment(state.bookMap,action.payload);

                state.activefragment=activeFragment;
                state.activeSrc = src;
                state.pleerlenght=lenght;
            }
        },
        UserSelectLenght(state, action:PayloadAction<number>){
            state.lenght=action.payload;

            let {src,lenght, activeFragment}= FindFragment(state.bookMap,action.payload);

            state.activefragment=activeFragment;
            state.activeSrc = src;
            state.pleerlenght=lenght;
        },
    },
})

// Action creators are generated for each case reducer function
export const {setvolume,setlenght,UserSelectLenght, setplay} = pleerSlice.actions;
export default pleerSlice.reducer

export const setpause = createAsyncThunk(
    'pleer/setpause',
    async (param:"pause" | "play", thunkApi) => {
        let {dispatch , getState}= thunkApi;
        let state=<RootState> getState();

        if (param==='play'){
            dispatch(setplay(param));
            ChangeVolume(state.pleer.volume,0.5,300,dispatch);
        }else{
            await ChangeVolume(state.pleer.volume,0,300,dispatch);
            dispatch(setplay(param));
        }
    return;
    }
)

async function ChangeVolume(NowVolume:number,NewVolume:number,ms:number , dispatch:ThunkDispatch<unknown, unknown, AnyAction>) {
    let frames = Math.floor((ms/1000)*60);
    let period = Math.floor(ms/frames);

    let OldVolume = NowVolume;

    let volumedelta = NewVolume-OldVolume;
    let volumepart = volumedelta/frames;

    let volumeNow = OldVolume;

    for(let i=0; i<frames;i++){
        await sleep(period);
        volumeNow=volumeNow+volumepart;
        volumeNow= volumeNow<0?0:volumeNow

        dispatch(setvolume(volumeNow));
    }
    return;
}


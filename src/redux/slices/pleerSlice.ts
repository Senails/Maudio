import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type pleerState={
    name: string,
    image: string,
    playpause:string,
    volume:number,
    alllenght:number,
    lenght:number,
    pleerselectlenght:number,
}


let initialState:pleerState = {
    image: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRCia7uc-NhYKl6xiMwdjLB9mIyAua4xYhH4co8b-bHJ0PcCGyhiulzHmJ6IdTsVmJSSoSbjm8=w1920-h902",
    playpause: 'pause',
    volume: 0.5,
    name: 'Чужак',
    alllenght:440.8,
    lenght:0,
    pleerselectlenght:0,
}


  
export const pleerSlice = createSlice({
    name: 'pleer',
    initialState,
    reducers:{
        setimage(state, action:PayloadAction<string>){
            state.image = action.payload;
        },
        setpause(state, action:PayloadAction<string>){
            state.playpause=action.payload;
        },
        setvolume(state, action:PayloadAction<number>){
            state.volume = action.payload;
        },
        setlenght(state, action:PayloadAction<number>){
            state.lenght=action.payload;
        },
        setalllenght(state, action:PayloadAction<number>){
            state.alllenght=action.payload;
        },
        setpleerselect(state, action:PayloadAction<number>){
            state.pleerselectlenght=action.payload;
        }
    }
})
  
  // Action creators are generated for each case reducer function
  export const {setimage,setpause,setvolume,setlenght,setalllenght,setpleerselect} = pleerSlice.actions
  
  export default pleerSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type pleerState={
    name: string,
    image: string,
    playpause:string,
    volume:number,
    alllenght:number,
    lenght:number,
}


let initialState:pleerState = {
    image: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRCia7uc-NhYKl6xiMwdjLB9mIyAua4xYhH4co8b-bHJ0PcCGyhiulzHmJ6IdTsVmJSSoSbjm8=w1920-h902",
    playpause: 'pause',
    volume: 0.5,
    name: 'Чужак',
    alllenght:100,
    lenght:30,
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
    }
})
  
  // Action creators are generated for each case reducer function
  export const {setimage,setpause,setvolume} = pleerSlice.actions
  
  export default pleerSlice.reducer

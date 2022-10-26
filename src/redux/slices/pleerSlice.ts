import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FindFragment } from '../../Utils/UtilsForPleer/findfragment';
import { RootState } from '../store';
import { ChangeVolume } from '../../Utils/UtilsForPleer/changevolum';
import { findnextbook } from '../../Utils/UtilsForPleer/findnextbook';
import { setbook } from '../../Utils/UtilsForPleer/setbook';

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

export type Collection = {
    name: string,
    books: Book[];
}

export type Seria = {
    name: string,
    description: string,
    authtor: string,
    collections: Collection[],
}

export type pleerState={
    seria: Seria,
    activecollection : number,
    activebook: number,
    bookMap:Book,
    activeSrc: string,
    activefragment:number,
    playpause:'pause'|'play',
    volume:number,
    userVolume:number,
    lenght:number,
    pleerlenght:number,
    block:boolean,
}

let seria: Seria  = {
    name:'Сэр Макс из Ехо',
    description:'12345',
    authtor:'Макс Фрай',
    collections:[
        {
            name:'Лабиринты Ехо',
            books:[
                {
                    name:'Чужак',
                    image: "https://lh3.googleusercontent.com/drive-viewer/AJc5JmRCia7uc-NhYKl6xiMwdjLB9mIyAua4xYhH4co8b-bHJ0PcCGyhiulzHmJ6IdTsVmJSSoSbjm8=w1920-h902",
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
                {
                    name:'Волонтеры вечности',
                    image: 'https://cdn.book24.ru/v2/ASE000000000701079/COVER/cover3d1.jpg',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
                {
                    name:'Простые волшебные вещи',
                    image: 'https://www.respublica.ru/uploads/00/00/00/51/mu/f2e19ff7a4dcfa0f.jpg',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
                
            ]
        },
        {
            name:'Хроники Ехо',
            books:[
                {
                    name:'Чуб земли',
                    image: 'https://cdn1.ozone.ru/s3/multimedia-r/6096623631.jpg',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
                {
                    name:'Властелин морморы',
                    image: 'https://bigi.by/images/data/catalog/2605/786661b5.1c49.11eb.bd4e.0025909303c3.786661b8.1c49.11eb.bd4e.0025909303c3.jpg',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
                {
                    name:'Неуловимый Хабба Хен',
                    image: 'https://cdn1.ozone.ru/s3/multimedia-0/6009817452.jpg',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
            ]
        },
        {
            name:'Сновидения Ехо',
            books:[
                {
                    name:'Мастер ветров и закатов',
                    image: 'https://cdn1.ozone.ru/multimedia/1012186167.jpg',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
                {
                    name:'Слишком много кошмаров',
                    image: 'https://lh3.googleusercontent.com/drive-viewer/AJc5JmRCia7uc-NhYKl6xiMwdjLB9mIyAua4xYhH4co8b-bHJ0PcCGyhiulzHmJ6IdTsVmJSSoSbjm8=w1920-h902',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
                {
                    name:'Вся правда о нас',
                    image: 'https://lh3.googleusercontent.com/drive-viewer/AJc5JmRCia7uc-NhYKl6xiMwdjLB9mIyAua4xYhH4co8b-bHJ0PcCGyhiulzHmJ6IdTsVmJSSoSbjm8=w1920-h902',
                    booklength: 440.816583*2,
                    bookparts: [
                    {lenght:440.816583, url:"./1245511.mp3"},
                    {lenght:440.816583, url:"./1245511.mp3"}
                ]
                },
            ]
        },
    ]
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
    seria:seria,
    activecollection : 0,
    activebook: 0,
    bookMap: book,
    activeSrc:"./1245511.mp3",
    activefragment:0,
    playpause: 'pause',
    volume: 0.5,
    userVolume:0.5,
    lenght:0,
    pleerlenght:0,
    block: false,
};
  
export const pleerSlice = createSlice({
    name: 'pleer',
    initialState,
    reducers:{
        setplay(state, action:PayloadAction<'pause'|'play'>){
            if (state.block) return;

            state.playpause=action.payload;
        },
        setvolume(state, action:PayloadAction<number>){
            if (state.block) return;
            state.volume = action.payload;
        },
        setlenght(state, action:PayloadAction<number>){
            if (state.block) return;
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
        changebook(state, action:PayloadAction<{coll:number,book:number}>){
            if (state.block) return;
            let {coll , book}=action.payload
            if (state.activecollection===coll && state.activebook===book) return;

            setbook(state,coll,book,'pause');
        },
        UserSelectLenght(state, action:PayloadAction<number>){
            if (state.block) return;

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
            state.pleerlenght=lenght;
        },
        UserSelectVolume(state, action:PayloadAction<number>){
            if (state.block) return;

            state.userVolume = action.payload;
            if (state.playpause==='play') state.volume=action.payload;
        },
    },
})

export const {setvolume,setlenght,UserSelectLenght,UserSelectVolume,setplay,changebook} = pleerSlice.actions;
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
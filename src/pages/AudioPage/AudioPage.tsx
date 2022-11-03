import { useEffect } from "react";
import { setAllState } from "../../redux/slices/pleerSlice";
import { useAppDispatch } from "../../redux/store";
import { Seria } from "../../types/pleerSlice";
import { Book } from "./book/Book";
import LeftPanel from "./leftPanel/LeftPanel";
import { PleerUI } from "./PleerUI/Pleer";

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

export default function AudioPage(){
    let dispatch = useAppDispatch()


    let openRequest = indexedDB.open('name', 1);


    useEffect(()=>{
        dispatch(setAllState(seria));
    },[]);

    return <div className=".AudioPage">
        <Book/>
        <PleerUI/>
        <LeftPanel/>
    </div>
}
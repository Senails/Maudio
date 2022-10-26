import { Seria } from '../../../redux/slices/pleerSlice';
import Collection from '../Collection/collectin';
import './style.scss';


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
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                {
                    name:'Волонтеры вечности',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                {
                    name:'Простые волшебные вещи',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                
            ]
        },
        {
            name:'Хроники Ехо',
            books:[
                {
                    name:'Чуб земли',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                {
                    name:'Властелин морморы',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                {
                    name:'Неуловимый Хабба Хен',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
            ]
        },
        {
            name:'Сновидения Ехо',
            books:[
                {
                    name:'Мастер ветров и закатов',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                {
                    name:'Слишком много кошмаров',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                {
                    name:'Вся правда о нас',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
            ]
        },
    ]
}

let state = {
    seria: seria,
    activecollection : 1,
    activebook: 1,
}

export default function ArrayUI(){
    let {seria ,activecollection, activebook}=state;


    let collectionarr = seria.collections.map((elem,i)=>{
        return <Collection 
        name={elem.name}
        books={elem.books}
        activeColl={activecollection}
        activeBook={activebook}
        numColl={i}
        key={i}/>
    });

    return <div className="array-box">
        {collectionarr}
    </div>
}
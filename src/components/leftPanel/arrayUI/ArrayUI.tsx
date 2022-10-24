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
                
            ]
        },
        {
            name:'Хроники Ехо',
            books:[
                {
                    name:'Ворона на мосту',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
                {
                    name:'Безумный рыбник',
                    image: ' hgfghf',
                    booklength: 1 ,
                    bookparts: [],
                },
            ]
        },
    ]
}

let state = {
    activecollection : 1,
    activebook: 1,
}

export default function ArrayUI(){
    let collectionarr = seria.collections.map((elem,i)=>{
        let activeColl = state.activecollection===i? '':'notactive';


        return <Collection 
        name={elem.name}
        books={elem.books}

        activeColl={activeColl}
        key={i}/>
    });


    return <div className="array-box">
        {collectionarr}
    </div>
}
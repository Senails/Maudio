import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Comment = {
    user:string;
    date: number;
    text:number;
    id:string;
}


type BookInfoState = {
    name:string;
    authtor:string;
    reiting:number;
    description:string;
    image:string;
    bookcount:number;
    comments:Comment[];
    userreiting:number;
    progress?:number;
    like?:boolean;
}


let initialState:BookInfoState = {
    name:'Хроники убийцы короля',
    authtor:'Патрик Ротфус',
    reiting: 4.5,
    userreiting:0,
    description:`Тяга к аферам и авантюрам в комплекте с наивысшим воровским искусством, соединенные в одном флаконе, способны перевернуть вверх дном и королевский дворец вкупе со всеми его обитателями, и столицу с ее жителями, и даже целое государство вместе с его соседями. И в Гиперийском царстве есть такой субъект — молодой, энергичный, сообразительный, деятельный, благородный и по-своему правдивый… аферист. Известный Арканарский вор. Не зря такое звание имеет только он один: равных ему попросту не существует и он всегда способен это доказать любому — и власть имущим, и известным магам, и простому человеку… А еще кличут его Графом, даже не думая, что это — его настоящий родовой титул. Хотя, об этом не ведает и его приемный отец, и он — ловец удачи…`,
    image:'',
    bookcount:12,
    comments:[],
    like: false,
    progress: 33.5,
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
        }
    }
})


export const {
    setUserReiting,
    setLike,
} = BookInfoSlice.actions;

export default BookInfoSlice.reducer;
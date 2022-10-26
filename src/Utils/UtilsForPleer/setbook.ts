import { pleerState } from "../../redux/slices/pleerSlice";

export function setbook(state:pleerState,coll:number,book:number,status:'play'|'pause'){

    state.activecollection=coll;
    state.activebook=book;
    state.lenght=0;
    state.pleerlenght=0;
    state.playpause=status;
    state.activefragment=0;
    state.bookMap=state.seria.collections[coll].books[book];
    state.activeSrc=state.seria.collections[coll].books[book].bookparts[0].url;
}
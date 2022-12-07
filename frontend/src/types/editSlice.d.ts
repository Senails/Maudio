export type EditImage = {
    url: string,
    googleid:string,
    status:'loadend'|'loading'|'error',
}

export type Editbookpart={
    name:string;
    id:string;
    lenght:number;
    url:string;
    googleid:string;
    size:number;
    status:'loadend'|'loading'|'error'|'waitloading',
}

export type EditBook= {
    name: string;
    image:EditImage;
    bookparts: Editbookpart[];
}

export type EditCollection = {
    name: string,
    books: EditBook[];
}

export type EditState = {
    href:string,
    collName:string,
    authtorName:string,
    description:string,
    bookImage:EditImage,
    collections: EditCollection[],
    removeOnSave:string[],
    removeOnCancel:string[],
    loading:boolean,
    showColl:number,
    showBook:number,
    dpopElement:number,
    dpopType:'coll'|'book'|'',
}

//////////////////////


export type payloadFragmentType = {
    numColl:number,
    nummBook:number,
    lenght:number,
    size:number,
    status:'loadend'|'loading'|'error'|'waitloading',
    googleid:string,
    url:string,
    id:string,
    name:string
}
export type EditImage = {
    url: string,
    googleid:string,
    status:'loadend'|'loading'|'error',
}

export type Editbookpart={
    id:string;
    lenght:number;
    url:string;
    googleid:string;
    size:number;
    status:'loadend'|'loading'|'error',
}

export type EditBook= {
    name: string;
    image:EditImage;
    booklength: number;
    bookparts: Editbookpart[];
    show?:boolean;
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
    bookcount:number,
    collections: EditCollection[],
    removeOnSave:string[],
    removeOnCancel:string[],
}
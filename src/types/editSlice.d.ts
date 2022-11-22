export type EditImage = {
    url: string,
    googleid:string;
}

export type Editbookpart={
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
    collName:string,
    authtorName:string,
    description:string,
    bookImage:EditImage,
    collections: EditCollection[],
    removeOnSave:[],
    removeOnCancel:[],
}
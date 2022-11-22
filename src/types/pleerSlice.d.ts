type bookpart={
    lenght:number;
    url:string;
}

export type Book= {
    name: string;
    image:string;
    booklength: number;
    bookparts: bookpart[];
    show?:boolean;
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
    hrefparam:string,
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
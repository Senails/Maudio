type fetchImage = {
    url: string,
    googleid:string,
}

export type BookDataFetch = {
    href:string,
    name:string,
    authtorname:string,
    bookcount:number,
    image:fetchImage,
    description:string,
}

export type Fetchbookpart={
    name:string;
    id:string;
    lenght:number;
    url:string;
    googleid:string;
    size:number;
    lenghtBefore:number;
}

export type FetchBook= {
    name: string;
    image: fetchImage;
    booklength: number;
    beforelenght:number;
    bookparts: Fetchbookpart[];
}

type FetchCollection={
    name: string,
    books: FetchBook[],
    lenght:number,
}

export type BookMapFetch = {
    href:string,
    name:string,
    authtorname:string,
    bookcount:number,
    image:fetchImage,
    description:string,
    collections: FetchCollection[]
}
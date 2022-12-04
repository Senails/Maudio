import { RefObject } from "react";

export function checkLoadMore(bookCardBox:RefObject<HTMLDivElement>){
    if (!bookCardBox.current) return false;

    let windowHeight = window.innerHeight;
    let {bottom} = bookCardBox.current.getBoundingClientRect();

    // console.log(windowHeight-bottom);
    if ((windowHeight-bottom)<150) return true;
    return false;
}
import React from "react";
import { setLike } from "../../../../../redux/slices/BookInfoSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store"
import { showMessage } from "../../../../../Utils/other/showMessage/showMessahe";

export function BookHeart(){
    let like = useAppSelector((state)=>state.bookinfo.like);
    let isAuth = useAppSelector((state)=>state.user.isAuth);

    let dispatch = useAppDispatch();

    function onclick(event:React.MouseEvent){
        if (!isAuth) return showMessage(event,'авторизуйтесь');
        dispatch(setLike(!like));
    }

    return <div
    onClick={onclick}
     className={`heart-icon ${like?'active':''}`}>
    </div>
}
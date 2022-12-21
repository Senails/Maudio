import React from "react";
import { userSetLike } from "../../../../../redux/slices/BookInfoSlice";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store"
import { showMessage } from "../../../../../Utils/other/showMessage/showMessahe";

export function BookHeart(){
    let _id = useAppSelector((state)=>state.bookinfo._id);
    let like = useAppSelector((state)=>state.bookinfo.like);
    let isAuth = useAppSelector((state)=>state.user.isAuth);

    let dispatch = useAppDispatch();

    function onclick(event:React.MouseEvent){
        if (!isAuth) return showMessage(event,'авторизуйтесь');
        dispatch(userSetLike({_id,like:!like}));
    }

    return <div
    onClick={onclick}
     className={`heart-icon ${like?'active':''}`}>
    </div>
}
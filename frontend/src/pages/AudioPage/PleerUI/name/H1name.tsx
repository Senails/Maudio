import { RootState, useAppSelector } from "../../../../redux/store";

export function H1Name(){
    let name = useAppSelector((state:RootState)=>state.pleer.bookMap.name);
    return <h1>{name}</h1>;
}